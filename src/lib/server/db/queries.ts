import {
    blogsTable,
    contextsTable,
    documentsTable, paragraphsTable,
    sentencesTable,
    userWordsTable,
    wicsTable,
    wordsTable
} from "$lib/server/db/schema";
import {and, count, desc, eq, inArray} from "drizzle-orm";
import {BLOGS_PER_PAGE, contextStatusEnum, SENTENCES_PER_TABLE, WORDS_PER_PAGE} from "$lib/client/common";
import type {PostgresJsDatabase} from "drizzle-orm/postgres-js/driver";
import type {Para} from "$lib/client/schemas";

export const queryWordByPage = async (uid:number, page: number,db:PostgresJsDatabase) =>
    await db.select().from(userWordsTable)
            .where(and(eq(userWordsTable.userId, uid), eq(userWordsTable.status,0)))
            .limit(WORDS_PER_PAGE)
            .offset((page-1) * WORDS_PER_PAGE)
            .orderBy(desc(userWordsTable.updatedAt))

export const deleteUserWordsByIds = async (uid: number, ids: number[], db:PostgresJsDatabase) =>
    await db.update(userWordsTable)
        .set({status: 1})
        .where(and(eq(userWordsTable.userId, uid),
            inArray(userWordsTable.id, ids)));

export const querySentenceByPage = async (uid: number, page: number, db:PostgresJsDatabase) => {
    const sentenceIds = await db.select().from(sentencesTable)
        .where(eq(sentencesTable.userId, uid))
        .limit(SENTENCES_PER_TABLE)
        .offset((page - 1) * SENTENCES_PER_TABLE)
        .orderBy(desc(sentencesTable.timestamp))
        .then(res => res.map(r => r.contextId));
    if (sentenceIds.length === 0) {
        return [];
    }
    return db.select()
        .from(contextsTable)
        .where(inArray(contextsTable.id, sentenceIds))
        .orderBy(desc(contextsTable.timestamp));
}

export const countUserSentences = async (uid: number, db:PostgresJsDatabase) => {
    const res = await db.select({count: count()})
            .from(sentencesTable)
            .where(eq(sentencesTable.userId, uid));
    return res[0]?.count
}

export const publishBlog = async (text: string, translation: string, hash: string, remark: string, db:PostgresJsDatabase) =>
    await db.transaction(async (db) => {
        await Promise.all([
            db.insert(blogsTable).values({text, translation, hash, remark}),
            db.update(contextsTable).set({status:contextStatusEnum.PUBLISHED})
            .where(eq(contextsTable.hash, hash))
        ]);
    });

export const queryBlogByPage = async (page: number, db:PostgresJsDatabase) =>
    await db.select().from(blogsTable)
        .limit(BLOGS_PER_PAGE)
        .offset((page-1) * BLOGS_PER_PAGE)
        .orderBy(desc(blogsTable.updated_at));

export const countBlogs = async (db:PostgresJsDatabase) =>
    await db.select({count: count()}).from(blogsTable).then(res => res[0]?.count);

export const selectParagraphsOnPage = async (docId: number, page: number, db:PostgresJsDatabase) =>
    await db.select().from(paragraphsTable)
        .where(and(eq(paragraphsTable.docId, docId), eq(paragraphsTable.page, page)))
        .orderBy(paragraphsTable.id);

export const selectWord = async (word: string, db:PostgresJsDatabase) =>
    await db.select().from(wordsTable).where(eq(wordsTable.word, word)).then((res) => res[0])


export const selectWicByHash = async (hash: string, db:PostgresJsDatabase) =>
    await db.select().from(wicsTable).where(eq(wicsTable.hash, hash)).then(res => res[0]);

export const insertWic = async (
    word: string, context:string, hash:string, translation: string, explainJson: Para, db:PostgresJsDatabase) =>
    await db.insert(wicsTable).values({hash, word, context, translation, exp: explainJson}).onConflictDoNothing();

export const selectContextByHash = async (hash: string, db:PostgresJsDatabase) =>
    await db.select().from(contextsTable).where(eq(contextsTable.hash, hash)).then(res => res[0]);

export const insertUserSentence = async (userId: number, contextId: number, db:PostgresJsDatabase) =>
    await db.insert(sentencesTable).values({userId, contextId}).onConflictDoNothing()

export const selectAllBooks = async (db:PostgresJsDatabase) =>
    await db.select().from(documentsTable).where(eq(documentsTable.status, 0)).then(res => res);

export const selectBookById = async (id: number, db:PostgresJsDatabase) =>
    await db.select().from(documentsTable).where(eq(documentsTable.id, id)).then(res => res[0]);

export const selectDocs = async (db:PostgresJsDatabase) =>
    await db.select().from(documentsTable)

export const selectParaById = async (id: number, db:PostgresJsDatabase) =>
    await db.select().from(paragraphsTable).where(eq(paragraphsTable.id, id)).then(res => res[0]);

export const deleteParaById = async (id: number, db:PostgresJsDatabase) =>
    await db.delete(paragraphsTable).where(eq(paragraphsTable.id, id));

export const updateParaById = async (id: number, text: string, parse:Para, db:PostgresJsDatabase) =>
    await db.update(paragraphsTable).set({text, parse}).where(eq(paragraphsTable.id, id));