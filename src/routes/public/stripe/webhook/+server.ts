import {json} from "@sveltejs/kit";

export async function POST({request}) {
    try {
        const event = await request.json();
        console.log("Stripe event type: ", event.type);

        return json({status: 200});
    } catch (e: any) {
        console.error("Error in stripe webhook handler: ", e);
        return json({error: e.message});
    }
}
