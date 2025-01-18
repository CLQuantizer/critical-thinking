
import {type RequestEvent} from "@sveltejs/kit";
import {HEADER_SECRET} from "$env/static/private";

const CLOUDFLARE_SECRET = `Bearer ${HEADER_SECRET}`;
export const GET = async (event:RequestEvent)=> {
    // const db = event.locals.db;
    // const Authorization = event.request.headers.get('Authorization');
    // if (strEqIgnCase(Authorization, CLOUDFLARE_SECRET)) {
    //     return json({error: "Invalid authorization"});
    // }
    // // validate the headers
    // await headsUpInTheMorning(db);
    // return json({message: "Evening job completed successfully"});
}