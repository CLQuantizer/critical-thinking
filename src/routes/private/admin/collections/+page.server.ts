import {selectDocs} from "$lib/server/db/queries";
import {redirect} from "@sveltejs/kit";

export const load = async ({locals}:any)=>{
    const userId = locals.user.id;
    if (userId !== 1) {
        redirect(303, '/private/collections');
    }
    const db = locals.db;
    const collections = await selectDocs(db);
    return {collections};
}