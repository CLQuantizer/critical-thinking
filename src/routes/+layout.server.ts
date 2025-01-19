import {getUserHypotheses} from "$lib/server/db/queries";

export const load = async ({ locals }) => {
    const userId = locals.userId;
    const db = locals.db;
    const hypotheses = await getUserHypotheses(userId, db);
    return {hypotheses};
}