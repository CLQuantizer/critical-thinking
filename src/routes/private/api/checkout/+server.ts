import {handleStripeCheckout} from "$lib/integrations/stripe/stripe";
import {z} from "zod";
import {documentsTable} from "$lib/server/db/schema";
import {eq} from "drizzle-orm";

export const POST = async ({locals, request}:any) => {
    try {
        const email = locals.user.email;
        const body = await request.json();
        const docId = z.number().parse(+body.docId);
        // fetch price id from the db
        const db = locals.db;
        const docInDb = await db.select()
            .from(documentsTable)
            .where(eq(documentsTable.id, docId))
        if (!docInDb || docInDb.length === 0) {
            return {error: "Document not found"};
        }
        const priceId = docInDb[0].priceId;
        return await handleStripeCheckout(email, priceId, docId);
    } catch (error) {
        console.error(error);
        return {error: "Failed to process the checkout."};
    }
}