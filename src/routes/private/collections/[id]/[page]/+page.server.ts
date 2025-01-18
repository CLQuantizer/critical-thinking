import {offsetsTable, userLogsTable} from "$lib/server/db/schema";
import {sql} from "drizzle-orm";
import {redirect} from "@sveltejs/kit";
import {z} from "zod";
import {COLLECTIONS_URL, FREE_PAGE_LIMIT, UserActionEnum} from "$lib/client/common";
import {selectParagraphsOnPage} from "$lib/server/db/queries";

export const load = async ({params, locals, parent}) => {
    const userId = locals.user.id;
    const {docs} = await parent();
    const idParse = z.number().safeParse(+params.id);
    if (!idParse.success) {
        redirect(303, COLLECTIONS_URL);
    }
    // if id not in any of the docs, redirect toCOLLECTIONS_URL
    if (!docs.some(doc => doc.id === idParse.data)) {
        redirect(303, COLLECTIONS_URL);
    }
    const id = idParse.data;
    const offsetParse = z.number().safeParse(+params.page)
    if (!offsetParse.success) {
        redirect(303, COLLECTIONS_URL);
    }
    const offset = offsetParse.data;
    const max = docs.find((doc:any) => doc.id === id)?.pages;
    if (!max || offset > max) {
        redirect(303, COLLECTIONS_URL);
    }
    const purchased = docs.find((doc:any) => doc.id === id)?.purchased;
    // if not purchased, and offset > limit, redirect toCOLLECTIONS_URL
    if (!purchased && offset > FREE_PAGE_LIMIT) {
        redirect(303, COLLECTIONS_URL+"/purchase/" + id);
    }
    const db = locals.db;
    const paragraphs = await selectParagraphsOnPage(id, offset, db);
    if (!paragraphs || paragraphs.length === 0) {
        redirect(303, COLLECTIONS_URL);
    }
    const docId = paragraphs[0].docId;
    try {
        await Promise.all([
            db.insert(offsetsTable)
                .values({user_id: userId, docId, page: offset})
                .onConflictDoUpdate({target: [offsetsTable.user_id, offsetsTable.docId], set: {page: offset>0?offset:0}})
                .execute(),
            db.insert(userLogsTable)
                .values({userId, docId, page: offset, action: UserActionEnum.VIEW})
                .onConflictDoUpdate({target: [userLogsTable.userId, userLogsTable.docId, userLogsTable.page], set: {timestamp: sql`CURRENT_TIMESTAMP`}})
                .execute()
        ]);
    } catch (error) {
        console.error('DB operation failed:', error);
    }
    return {paragraphs, docId, offset};
}