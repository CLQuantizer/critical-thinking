import {offsetsTable} from "$lib/server/db/schema";
import {desc, eq} from "drizzle-orm";
import {COLLECTIONS_URL} from "$lib/client/common";
import {json} from "@sveltejs/kit";

export const POST = async ({locals}:any) => {
    try {
        const db = locals.db;
        console.log("POST /api/recent: ", locals.user.email)
        const user = locals.user
        const latestOffset = await db.select()
            .from(offsetsTable)
            .where(eq(offsetsTable.user_id, user.id))
            .orderBy(desc(offsetsTable.updated_at))
            .limit(1).then((rows:any) => rows[0]);
        if (!latestOffset) {
            return json({url: COLLECTIONS_URL});
        }
        return json({url: `${COLLECTIONS_URL}/${latestOffset.docId}/${latestOffset.page}`});
    } catch (e: any) {
        console.error("POST /api/recent", e.message)
        return json({error: 'Internal Server Error'});
    }
}