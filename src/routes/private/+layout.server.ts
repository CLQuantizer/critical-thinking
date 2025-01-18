import {offsetsTable} from "$lib/server/db/schema";
import {eq} from "drizzle-orm";

export const load = async ({locals}) => {
    const db = locals.db;
    const len = await db.select().from(offsetsTable)
        .where(eq(offsetsTable.user_id, locals.user.id))
        .limit(1).then(rows => rows.length);
    const userHasOffset = len > 0;
    return {userHasOffset};
};