import {json, type RequestEvent} from "@sveltejs/kit";
import {hypothesesTable} from "$lib/server/db/schema";
import {generateAlternativeHypotheses} from "$lib/integrations/openai/think";

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
        const {hypothesis, context} = await event.request.json() as {hypothesis:string, context:string};
        await db.insert(hypothesesTable).values({text:hypothesis, context});
        const alternatives = await generateAlternativeHypotheses(hypothesis, context);
        return json({alternatives});
    } catch (error) {
        console.log(error);
        return json({"error": error});
    }
}