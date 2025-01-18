import {z} from "zod";
import {feedbacksTable} from "$lib/server/db/schema";
import {json} from "@sveltejs/kit";

export const POST = async ({ request, locals }: any) => {
    try {
        const body = await request.json();
        const feedback = z.string().parse(body.feedback);
        const db = locals.db;
        await db.insert(feedbacksTable).values({
            userId: locals.user.id,
            email: locals.user.email,
            feedback
        })
        return json({data: feedback});
    } catch (e:any) {
        console.error(e.message);
        return json({error:"error sending feedback. System is down"})
    }
}