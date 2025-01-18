import Stripe from 'stripe';
import { STRIPE_KEY } from '$env/static/private';
import {json} from "@sveltejs/kit";

export const stripeInstance = new Stripe(STRIPE_KEY);

export const handleStripeCheckout = async (email:string, priceId:string, docId:number) => {
    console.log("handleStripeCheckout, email:", email);
    try {
        const existingCustomer = await stripeInstance.customers.list({email});
        const customer = existingCustomer.data.length > 0 ? existingCustomer.data[0] :
            await stripeInstance.customers.create({email});
        console.log("user pay customer:", customer.id);
        const session = await stripeInstance.checkout.sessions.create({
            customer: customer.id,
            line_items: [{price: priceId, quantity: 1,}],
            mode: 'payment',
            success_url: 'https://mywords.io/private/collections',
            cancel_url: 'https://mywords.io/private/collections',
            metadata: {docId},
        });
        const url = session.url;
        console.log("session:", url);
        if (!url) {
            return json({error: "Failed to create the payment session"});
        }
        return json({url});
    } catch (e) {
        console.error("error:", e);
        return json({error: "Invalid input"});
    }
}
