import {queryWordByPage} from "$lib/server/db/queries";
import {json} from "@sveltejs/kit";
import {z} from "zod";

export const POST = async ({locals, request}) => {
    try {
        const uid = locals.user.id;
        const body = await request.json();
        const page = z.number().min(1).parse(body.page);
        const words = await queryWordByPage(uid, page, locals.db);
        return json({words})
    } catch (e:any) {
        return json({error:"fail to query"})
    }
}