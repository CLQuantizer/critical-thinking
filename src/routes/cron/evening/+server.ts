import {CLOUDFLARE_SECRET, wrapUpInTheEvening} from "$lib/integrations/scanner";
import {json} from "@sveltejs/kit";
import {strEqIgnCase} from "$lib/client/common";

export const GET = async (event)=> {
    const db = event.locals.db;
    const Authorization = event.request.headers.get('Authorization');
    if (strEqIgnCase(Authorization, CLOUDFLARE_SECRET)) {
        return json({error: "Invalid authorization"});
    }
    // validate the headers
    await wrapUpInTheEvening(db);
    return json({message: "Morning job completed successfully"});
}