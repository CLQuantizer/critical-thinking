import {sql} from "drizzle-orm";
import {contextInDbSchema} from "$lib/server/db/schema";
import {french2English} from "$lib/integrations/cf/translate";
import {z} from "zod";
import type {PostgresJsDatabase} from "drizzle-orm/postgres-js/driver";
import type {Para} from "$lib/client/schemas";
import {selectContextByHash} from "$lib/server/db/queries";

export type ginSenArgs = {
    hash: string;
    text: string;
    translation: string;
    parse: string;
}

export const searchContextByWord = async (word: string, db:PostgresJsDatabase) => {
    const res = await db.execute(sql`SELECT id, text, parse FROM contexts WHERE vec @@ to_tsquery('french', ${word})`);
    // json parse the parse field
    return res.map((r:any) => ({...r, parse: JSON.parse(r.parse)}));
}

// GIN as in Generalized Inverted Index
export const ginSen = async ({text, hash, translation, parse}: ginSenArgs, db:PostgresJsDatabase) => {
    console.log("ginning context:", text);
    const ret = await db.execute(sql`INSERT INTO contexts (text, translation, hash, parse, vec)
                          VALUES (${text}, ${translation}, ${hash}, ${parse}, to_tsvector('french', ${text}))
                          on conflict do nothing
                          returning *`)
    return ret.map((r:any) => ({...r, timestamp: new Date(r.timestamp)}));
}

export const processContextV2 = async (hash:string, p: Para, db:PostgresJsDatabase) => {
    z.string().max(10,"processContext: hash too long").parse(hash);
    const existing = await selectContextByHash(hash, db);
    if (existing) {
        return existing;
    }
    const text = p.paragraph;
    // GIN the text with parse, audio, and translation
    const translation = await french2English(text);
    const res = await ginSen({hash, text, translation, parse: JSON.stringify(p)}, db);
    return contextInDbSchema.parse(res[0]);
}