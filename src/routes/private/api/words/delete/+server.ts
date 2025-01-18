import {deleteUserWordsByIds} from "$lib/server/db/queries";
import {json} from "@sveltejs/kit";
import {z} from "zod";

export const POST = async ({locals, request}) => {
    try {
        const uid = locals.user.id;
        const body = await request.json();
        const ids = z.array(z.number()).min(1).parse(body.ids)
        const db = locals.db;
        await deleteUserWordsByIds(uid, ids, db);
        console.log(`Deleting ${ids.length} words for uid=${uid}`)
        return json({data:1})
    } catch (e:any) {
        return json({error:"fail to query"})
    }
}