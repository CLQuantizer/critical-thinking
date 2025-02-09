import { drizzle } from 'drizzle-orm/d1';
import { USER_ID } from "$lib/client/common";
import { sequence } from "@sveltejs/kit/hooks";
import type { Handle, HandleServerError } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').HandleServerError} */
export const handleError: HandleServerError = ({ error }) => {
    return { message: error.message };
};

const setupDatabase: Handle = async ({ event, resolve }) => {
    const DB = event.platform?.env?.DB;
    if (!DB) throw new Error("DB not found");
    event.locals.db = drizzle(DB);
    return resolve(event);
};

const handleUserSession: Handle = async ({ event, resolve }) => {
    let userId = event.cookies.get(USER_ID);

    if (!userId) {
        userId = crypto.randomUUID();
        event.cookies.set(USER_ID, userId, {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 365 // 1 year
        });
    }

    event.locals.userId = userId;
    return resolve(event);
};

const setCacheHeaders: Handle = async ({ event, resolve }) => {
    const response = await resolve(event);
    response.headers.append('Vary', 'Cookie');
    response.headers.set('Cache-Control', 'private, no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '-1');
    response.headers.set('Surrogate-Control', 'no-store');
    return response;
};

export const handle = sequence(
    setupDatabase,
    handleUserSession,
    setCacheHeaders
);