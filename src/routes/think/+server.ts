import type {RequestEvent} from "@sveltejs/kit";
import {hypothesesTable} from "$lib/server/db/schema";

export const POST = async (event:RequestEvent)=> {
    const db = event.locals.db;
    const hypo = db.select().from(hypothesesTable).all();
    return {hypo};
}