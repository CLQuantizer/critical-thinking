import {querySentenceByPage} from "$lib/server/db/queries";
import {z} from "zod";
import {json} from "@sveltejs/kit";

export const POST = async ({locals, request}) => {
    try {
        const uid = locals.user.id;
        const body = await request.json();
        const page = z.number().min(1).parse(body.page)
        const contexts = await querySentenceByPage(uid, page, locals.db);
        return json({contexts})
    } catch (e:any){
        return json({error:e.message})
    }
}