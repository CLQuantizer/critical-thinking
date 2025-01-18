import {z} from "zod";
import {strEqIgnCase} from "$lib/client/common";
import {drizzle} from 'drizzle-orm/d1';

/** @type {import('@sveltejs/kit').HandleServerError} */
export function handleError(input: any) {
    const message = input.error.message;
    return { message };
}

const publicPaths = ['/public', '/docs', '/stripe', '/auth', '/cron', '/txt', '/blog','/books','/learn'];

export const handle =  async ({ event, resolve }) => {
    const DB = event.platform?.env?.DB;
    if (!DB) throw new Error("DB is not set");
    event.locals.db = drizzle(DB);
    const isPublicRoute = publicPaths.some(path => event.url.pathname.startsWith(path)
        || (strEqIgnCase(event.url.pathname.toLowerCase(),'/')));
    if (isPublicRoute) {
        return await resolve(event);
    }
    return await resolve(event)
}