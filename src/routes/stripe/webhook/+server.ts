import {stripeInstance} from "$lib/integrations/stripe/stripe";
import {STRIPE_WEBHOOK_SECRET} from "$env/static/private";
import {purchasesTable} from "$lib/server/db/schema";
import {z} from "zod";

export const POST = async ({request, locals}: any) => {
    try {
        const body = await request.text();
        const sig = request.headers.get('stripe-signature');
        const event = stripeInstance.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET);
        const db = locals.db;
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;
            //@ts-ignore
            const docId = z.number().positive().parse(+session.metadata.docId)
            //@ts-ignore
            const email = z.string().email().parse(session.customer_details.email)
            const checkoutSessionId = z.string().min(5).parse(session.id)
            await db.insert(purchasesTable).values({docId, email, checkoutSessionId});
        }
        // Return a response to acknowledge receipt of the event
        return new Response(null, { status: 200 });
    } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`);
        return new Response(`Webhook Error: ${err.message}`, { status: 200 });
    }
}