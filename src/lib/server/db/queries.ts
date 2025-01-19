import type {DrizzleD1Database} from "drizzle-orm/d1/driver";
import {hypothesesTable} from "$lib/server/db/schema";
import {and, eq} from "drizzle-orm";

export const getUserHypotheses = async (userId:string, db:DrizzleD1Database) =>
    await db.select().from(hypothesesTable).where(eq(hypothesesTable.userId, userId)).all();

export const getUserHypothesisById = async (userId:string, id:number, db:DrizzleD1Database) =>
    await db.select().from(hypothesesTable).where(and(eq(hypothesesTable.userId, userId), eq(hypothesesTable.id, id))).then(h=>h[0]);