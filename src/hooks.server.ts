import {drizzle} from 'drizzle-orm/d1';
import {SqlLiteClient} from "$lib/server/db/local/client";


/** @type {import('@sveltejs/kit').HandleServerError} */
export function handleError(input: any) {
    const message = input.error.message;
    return { message };
}

// const publicPaths = ['/public', '/docs', '/stripe', '/auth', '/cron', '/txt', '/blog','/books','/learn'];
export const handle =  async ({ event, resolve }) => {
    const DB = event.platform?.env?.DB;
    event.locals.db = DB ? drizzle(DB): SqlLiteClient;
    return await resolve(event)
}