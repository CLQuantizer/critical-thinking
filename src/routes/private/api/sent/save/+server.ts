import {z} from "zod";
import {json} from "@sveltejs/kit";
import {hashText} from "$lib/server/services/hash";
import {paragraphSchema} from "$lib/client/schemas";
import {processContextV2} from "$lib/server/services/context";
import {insertUserSentence} from "$lib/server/db/queries";

export const POST = async ({request, locals}:any) => {
    try {
        const db = locals.db;
        const body = await request.json();
        const parse = paragraphSchema.parse(body.parse);
        const userId = locals.user.id;
        const text = parse.paragraph
        const hash = hashText(text);
        const context = await processContextV2(hash, parse, db);
        const contextId = z.number().parse(context?.id);
        await insertUserSentence(userId, contextId, db);
        return json({data: text});
    } catch (e: any) {
        console.error("Error in saving sentence", e);
        return json({error: "Internal Server Error"});
    }
}
