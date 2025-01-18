import {redirect} from "@sveltejs/kit";
import {z} from "zod";
import {COLLECTIONS_URL} from "$lib/client/common";
import {selectParagraphsOnPage} from "$lib/server/db/queries";

export const load = async ({params, locals}) => {
    const idParse = z.number().safeParse(+params.id);
    const pageParse = z.number().safeParse(+params.page)
    if (!idParse.success || !pageParse.success) {
        redirect(303, COLLECTIONS_URL);
    }
    const id = idParse.data;
    const page = pageParse.data;
    const db = locals.db;
    const paragraphs = await selectParagraphsOnPage(id, page, db);
    if (!paragraphs || paragraphs.length === 0) {
        redirect(303, COLLECTIONS_URL);
    }
    const docId = paragraphs[0].docId;
    return {paragraphs, docId, page};
}