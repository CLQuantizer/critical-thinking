import {drizzle} from 'drizzle-orm/d1';
import {ENVS, strEqIgnCase} from "$lib/client/common";
import {ENV} from "$env/static/private";
import {SqlLiteClient} from "$lib/server/db/local/client";


/** @type {import('@sveltejs/kit').HandleServerError} */
export function handleError(input: any) {
    const message = input.error.message;
    return { message };
}

// const publicPaths = ['/public', '/docs', '/stripe', '/auth', '/cron', '/txt', '/blog','/books','/learn'];
export const handle =  async ({ event, resolve }) => {
    if (strEqIgnCase(ENVS.DEV, ENV)) {
        event.locals.db = SqlLiteClient
        return await resolve(event)
    }
    const DB = event.platform?.env?.DB;
    if (!DB) throw new Error("DB is not set");
    event.locals.db = drizzle(DB);
    return await resolve(event)
}