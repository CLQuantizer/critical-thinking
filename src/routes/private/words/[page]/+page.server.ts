import {queryWordByPage} from "$lib/server/db/queries";
import {z} from "zod";


export const load = async ({locals, params}: any) => {
    const pageParse = z.number().safeParse(+params.page)
    if (!pageParse.success) {
        return {status: 404}
    }
    const db = locals.db;
    const userId = locals.user.id;
    console.log('word page', pageParse.data)
    const words = await queryWordByPage(userId, pageParse.data, db);
    return {words}
}