import {selectAllBooks} from "$lib/server/db/queries";

export const load = async ({locals}:any) => {
    const book = await selectAllBooks(locals.db);
    return {book};
}