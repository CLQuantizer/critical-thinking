import {z} from "zod";
import {queryWordByPage} from "$lib/server/db/queries";
import {getWordStats} from "$lib/server/services/user";
import type {statsSchema} from "$lib/server/types";
import {redirect} from "@sveltejs/kit";
import {WORDS_URL} from "$lib/client/common";

const removeInitialZeros = (data: statsSchema[]): statsSchema[] => {
    const firstNonZeroIndex = data.findIndex(item => Number(item.word_count) !== 0);
    return firstNonZeroIndex === -1 ? data : data.slice(firstNonZeroIndex);
}

export const load = async ({locals, params}: any) => {
    const pageParse = z.number().safeParse(+params.page)
    if (!pageParse.success) {
        redirect(302, WORDS_URL+'/1')
    }
    const db = locals.db;
    const userId = locals.user.id;
    const res = await getWordStats(userId, db) as any;
    const stats = removeInitialZeros(res)
    const totalWords = stats?.reduce((sum, row:any) =>
        sum + Number(row.word_count), 0) || 0;
    return {stats, count: totalWords}
}