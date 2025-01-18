import {z} from "zod";
import {pageFlagsTable} from "$lib/server/db/schema";
import {json} from "@sveltejs/kit";

export const POST = async ({ request, locals }: any) => {
    try {
        const body = await request.json();
        const page = z.number().parse(body.page);
        const docId = z.number().parse(body.docId);
        const email = z.string().parse(locals.user.email);
        const feedback = z.string().parse(body.feedback);
        const db = locals.db;
        await db.insert(pageFlagsTable).values({
            docId, page, email, feedback
        }).onConflictDoNothing();
        return json({data: feedback});
    } catch (e:any) {
        console.error(e.message);
        return json({error:"error sending feedback. System is down"})
    }
}