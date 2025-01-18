import {offsetsTable, purchasesTable} from "$lib/server/db/schema";
import {and, eq} from "drizzle-orm";
import {COLLECTION_KEY} from "$lib/client/common";
import {selectDocs} from "$lib/server/db/queries";

export const load = async ({locals, depends}) => {
    const db = locals.db;
    const user = locals.user;
    const docsInDb = await selectDocs(db);
    // but allow admin to view any document. if userId is not 1
    // then filter out all docs whose status is not 0
    const filteredDocs = user.id === 1 ? docsInDb : docsInDb.filter(doc => doc.status === 0);

    // Then, fetch offsets and purchases for this user
    const [offsets, purchases] = await Promise.all([
        db.select()
            .from(offsetsTable)
            .where(eq(offsetsTable.user_id, user.id)),
        db.select()
            .from(purchasesTable)
            .where(and(eq(purchasesTable.email, user.email), eq(purchasesTable.status, 0)))
    ]);

    const offsetMap = new Map(offsets.map(offset => [offset.docId, offset.page]));
    const purchasedDocs = new Set(purchases.map(purchase => purchase.docId));
    const docs = filteredDocs.map(doc => ({
        ...doc,
        offset: offsetMap.get(doc.id) || 0,
        purchased: purchasedDocs.has(doc.id)
    }));
    depends(COLLECTION_KEY)
    return { docs, user };
};