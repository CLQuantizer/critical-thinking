import {FE_SESSION} from "$lib/client/FeUtils";
import {z} from "zod";
import {ENVS, strEqIgnCase} from "$lib/client/common";
import {getUser} from "$lib/server/services/user";
import {DEV_UID, DEV_EMAIL} from "$env/static/private"
import {env} from "$env/dynamic/private";
import postgres from "postgres";
import {drizzle} from "drizzle-orm/postgres-js";

/** @type {import('@sveltejs/kit').HandleServerError} */
export function handleError(input: any) {
    const message = input.error.message;
    return { message };
}

const validateJsonAndReturn = (str: string|null|undefined) => {
    try {
        return JSON.parse(str as string)
    } catch (e) {
        return false;
    }
}

const feSessionSchema = z.object({ user:z.object({ email: z.string(), id: z.string() }) });

const publicPaths = ['/public', '/docs', '/stripe', '/auth', '/cron', '/txt', '/blog','/books','/learn'];

export const handle =  async ({ event, resolve }) => {
    const DB_CON = strEqIgnCase(env.ENV,ENVS.DEV) ? env.DATABASE_URL : event.platform?.env?.HYPERDRIVE
    if (!DB_CON) throw new Error("DB_CON is not set");
    const client = postgres(DB_CON);
    const db = drizzle(client);
    event.locals.db = db;
    const isPublicRoute = publicPaths.some(path => event.url.pathname.startsWith(path)
        || (strEqIgnCase(event.url.pathname.toLowerCase(),'/')));
    if (isPublicRoute) {
        return await resolve(event);
    }
    if (strEqIgnCase(env.ENV,ENVS.DEV)){
        console.log("DEV MODE")
        event.locals.user = await getUser(DEV_UID, DEV_EMAIL, db);
        return await resolve(event)
    }
    const sessionJson = validateJsonAndReturn(event.cookies.get(FE_SESSION))
    event.locals.session = sessionJson
    const parse = feSessionSchema.safeParse(sessionJson);
    if (!sessionJson || !parse.success) {
        return new Response('Redirect', {status: 303, headers: {Location: '/auth/login'}});
    }
    const session = parse.data;
    const email = session.user.email;
    event.locals.user = await getUser(session.user.id, email, db);
    return await resolve(event)
}