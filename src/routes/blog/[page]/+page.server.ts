import {queryBlogByPage} from "$lib/server/db/queries";

export const load = async ({locals, params}) => {
    const db = locals.db;
    const page = params.page;
    const blogs = await queryBlogByPage(+page, db);
    return {blogs}
}