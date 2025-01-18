import { json } from "@sveltejs/kit";
import {z} from "zod";
import {insertUserWord, processWic, processWord} from "$lib/server/services/words";
import {hashText} from "$lib/server/services/hash";
import {paragraphSchema} from "$lib/client/schemas";
import {processContextV2} from "$lib/server/services/context";

export const POST = async ({ request, locals }: any) => {
    try {
        const body = await request.json();
        const word = z.string().parse(body.word);
        const ctxParse = paragraphSchema.parse(body.parse);
        const ctx = ctxParse.paragraph;
        const ctxHash = hashText(ctx);
        const userId = locals.user.id;
        const db = locals.db;
        // check if the word is already in db (word + lang)
        const [wordInDb, ctxInDb, wicInDb] = await Promise.all([
            processWord(word, db),
            processContextV2(ctxHash, ctxParse, db),
            processWic(word, ctx, db)
        ])
        if (!wordInDb || !ctxInDb || !wicInDb) {
            return json({error: "Failed to process the word"});
        }
        await insertUserWord(userId, wordInDb.word, db);
        return json({word:wordInDb.word, exp:wicInDb.exp, base:wicInDb.base, hash:wordInDb.hash, context:ctxInDb});
    } catch (e) {
        console.error("Error while generating word:", e);
        return json({error: "Everything is broken"});
    }
}