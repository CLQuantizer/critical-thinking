import type {RequestEvent} from "@sveltejs/kit";
import {hypothesesTable} from "$lib/server/db/schema";

export const GET = async (event:RequestEvent)=> {
    try {
        const db = event.locals.db;
        const hypo = await db.select().from(hypothesesTable).all();
        return {hypo};
    } catch (error) {
        console.log(error);
        return {error};
    }
}