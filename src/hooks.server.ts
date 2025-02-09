import {drizzle} from 'drizzle-orm/d1';
import {USER_ID} from "$lib/client/common";

/** @type {import('@sveltejs/kit').HandleServerError} */
export function handleError(input: any) {
    const message = input.error.message;
    return { message };
}

export const handle =  async ({ event, resolve }) => {
    const DB = event.platform?.env?.DB;
    if (!DB) throw new Error("DB not found");
    event.locals.db = drizzle(DB)
    // Check if user has an ID cookie
    let userId = event.cookies.get(USER_ID)

    // If no cookie exists, create one
    if (!userId) {
        userId = crypto.randomUUID()
        // Set cookie with appropriate options
        event.cookies.set(USER_ID, userId, {
            path: '/',
            httpOnly: true,     // Prevents JavaScript access (more secure)
            secure: true,       // Only sent over HTTPS
            sameSite: 'lax',    // Protects against CSRF
            maxAge: 60 * 60 * 24 * 365 // 1 year in seconds
        })
    }
    event.locals.userId = userId
    const response = await resolve(event)
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    return response
}