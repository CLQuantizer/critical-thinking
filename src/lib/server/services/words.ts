import {userWordsTable, wordsTable} from "$lib/server/db/schema";
import {sql} from "drizzle-orm";
import type {PostgresJsDatabase} from "drizzle-orm/postgres-js/driver";
import {hashText} from "$lib/server/services/hash";
import {insertWic, selectWicByHash, selectWord} from "$lib/server/db/queries";
import {getWordMeaningsInBothLanguages} from "$lib/integrations/openai/wic";
import {tokenizeFrenchParagraph} from "$lib/server/services/tokenizeFrench";

export const insertUserWord = async (userId: number, word: string, db:PostgresJsDatabase) =>
    db.insert(userWordsTable).values({userId, word})
        .onConflictDoUpdate({
            target: [userWordsTable.userId, userWordsTable.word],
            set: {updatedAt: sql`CURRENT_TIMESTAMP`}
        })

export const processWic = async (word: string, context: string, db:PostgresJsDatabase) => {
    const hash = hashText(`${word}-wic-${context}`);
    const existing = await selectWicByHash(hash, db);
    if (existing) {
        return {word, exp: existing.exp, base: existing.translation};
    }
    console.log("starting wic process for word:", word, "in context:", context);
    const {target, base} = await getWordMeaningsInBothLanguages(word, context);
    const exp = tokenizeFrenchParagraph(target);
    await insertWic(word, context, hash, base, exp, db);
    return {word, exp, base};
}

export const processWord = async (word: string, db: PostgresJsDatabase) => {
    const existing = await selectWord(word, db);
    if (existing) {
        return existing;
    }
    console.log("word root requested for:", word);
    // otherwise, generate the word meaning and GIN the contextText and insert user_word
    const start = Date.now();
    const wordHash = hashText(word);
    // Run these word operations concurrently
    // insert the word into the database and then insert the user_word
    const wordInDB = await db.insert(wordsTable)
        .values({word, hash:wordHash})
        .returning()
        .then((r) => r[0]);
    const end = Date.now();
    console.log("New word generated :", word, "in", end - start, "ms");
    return wordInDB;
}