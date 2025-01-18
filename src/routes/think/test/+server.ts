import {json, type RequestEvent} from "@sveltejs/kit";
import {sql} from "drizzle-orm";


export const GET = async (event:RequestEvent)=> {
    try {
        const db = event.locals.db;
        // Query to get all tables
        const tables = await db.run(sql`
            SELECT name
            FROM sqlite_master
            WHERE type='table'
            ORDER BY name;
        `);
        return json({tables});
    } catch (error) {
        console.log(error);
        return json({"error": error});
    }
}