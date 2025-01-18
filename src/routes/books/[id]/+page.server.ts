import {selectBookById} from "$lib/server/db/queries";


export const load = async ({locals, params}:any) => {
    try {
        const id = +params.id;
        const doc = await selectBookById(id, locals.db);
        return {doc};
    } catch (error) {
        return {error: "Failed to load book"};
    }
}