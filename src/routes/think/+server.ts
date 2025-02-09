import {json, type RequestEvent} from "@sveltejs/kit";
import {hypothesesTable} from "$lib/server/db/schema";
import {hashText} from "$lib/server/services/hash";
import {generateAlternativeHypotheses} from "$lib/integrations/gemini/Gemini";

export const GET = async (event:RequestEvent)=> {
    try {
        const db = event.locals.db;
        const hypo = await db.select().from(hypothesesTable).all();
        return json({hypo});
    } catch (error) {
        console.log(error);
        return json({"error": error});
    }
}

export const POST = async (event:RequestEvent)=> {
    try {
        const db = event.locals.db;
        const userId = event.locals.userId;
        const {hypothesis, context} = await event.request.json() as {hypothesis:string, context:string};
        const hash = hashText(hypothesis+context+userId);
        const [_, alternatives] = await Promise.all([
            db.insert(hypothesesTable).values({text:hypothesis, context, hash, userId}),
            generateAlternativeHypotheses(hypothesis, context)
        ]);
        return json({alternatives});
    } catch (error:any) {
        if (error.message?.includes("UNIQUE constraint")) {
            return json({error: "Repeated Hypothesis"});
        }
        console.log(error);
        return json({"error": "Internal Server Error"});
    }
}