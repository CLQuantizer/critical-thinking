import {userWordsTable} from "$lib/server/db/schema";
import {and, count, desc, eq, gte} from "drizzle-orm";
import {BOT_TOKEN, CHAT_ID, HEADER_SECRET, OWNER_ID} from "$env/static/private";
import ky from 'ky';
import {generateEncouragement, generateLearningSummary} from "$lib/integrations/openai/word";
import type {PostgresJsDatabase} from "drizzle-orm/postgres-js/driver";

// for communications with cloudflare worker
export const CLOUDFLARE_SECRET = `Bearer ${HEADER_SECRET}`;

export const countWordsInLast24hours = async (userId: number, db:PostgresJsDatabase) => {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return await db
        .select({count: count()})
        .from(userWordsTable)
        .where(and(eq(userWordsTable.userId, userId),
            gte(userWordsTable.updatedAt, twentyFourHoursAgo)))
        .then(res => res[0].count);
}

export const getLast10Words = async (userId: number, db:PostgresJsDatabase) => {
    return await db
        .select()
        .from(userWordsTable)
        .where(eq(userWordsTable.userId, userId))
        .orderBy(desc(userWordsTable.updatedAt))
        .limit(10)
        .then(res => res.map(r => r.word));
}

export const sendTelegramMessage = async (text:string)=> {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const payload = { chat_id: CHAT_ID, text };
    try {
        const response = await ky.post(url, { json: payload }).json();
        console.log(`Message sent: ${text}`);
        return response;
    } catch (error) {
        console.error('Error sending text:', error);
        throw error;
    }
}

export const headsUpInTheMorning = async (db:PostgresJsDatabase) => {
    const words = await getLast10Words(+OWNER_ID, db);
    if (words.length === 0) {
        console.log("No words to learn today.");
        return;
    }
    const summary = await generateLearningSummary(words);
    await sendTelegramMessage("讚！是時候學習法文了！但首先，讓我們回顧一下您最新學的：\n" + summary);
}

export const wrapUpInTheEvening = async (db:PostgresJsDatabase) => {
    const isGoalReached = await countWordsInLast24hours(+OWNER_ID, db) >= 10;
    if (isGoalReached) {
        const summary = await generateLearningSummary(await getLast10Words(+OWNER_ID, db));
        await sendTelegramMessage("恭喜！您已達到今天的學習目標！🎉\n" + summary);
        return
    }
    await sendTelegramMessage(await generateEncouragement());
}