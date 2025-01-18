import { json } from "@sveltejs/kit";
import {eq} from "drizzle-orm";
import {wordsTable} from "$lib/server/db/schema";
import {searchContextByWord} from "$lib/server/services/context";
import type {PostgresJsDatabase} from "drizzle-orm/postgres-js/driver";

const selectWord = async (word: string, db: PostgresJsDatabase) =>
    await db.select()
        .from(wordsTable)
        .where(eq(wordsTable.word, word))
        .then((res) => res[0])

export const POST = async ({ request, locals }: any) => {
    try {
        const body = await request.json();
        console.log("GET word request body:", body)
        const w = body.word;
        const db = locals.db;
        const word = await selectWord(w, db);
        if (!word) {
            return json({error: "Word not found"});
        }
        const contexts = await searchContextByWord(word.word, db);
        return json({word, contexts});
    } catch (e) {
        console.error("Error while getting word meaning:", e);
        return json({error: "Internal Server Error"});
    }
}
