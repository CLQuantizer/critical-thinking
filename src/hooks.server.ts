import {drizzle} from 'drizzle-orm/d1';

/** @type {import('@sveltejs/kit').HandleServerError} */
export function handleError(input: any) {
    const message = input.error.message;
    return { message };
}

export const handle =  async ({ event, resolve }) => {
    const DB = event.platform?.env?.DB;
    if (!DB) throw new Error("DB not found");
    event.locals.db = drizzle(DB)
    return await resolve(event)
}