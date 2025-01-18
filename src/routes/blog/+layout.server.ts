import {countBlogs} from "$lib/server/db/queries";

export const load = async ({locals}) => {
    const db = locals.db;
    const count = await countBlogs(db);
    return {count}
}