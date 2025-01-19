import {getUserHypothesisById} from "$lib/server/db/queries";
import {z} from "zod";
import {redirect} from "@sveltejs/kit";

export const load = async ({ params, locals }) => {
    const userId = locals.userId;
    const id = z.number().parse(+params.id);
    const db = locals.db;
    const hypothesis = await getUserHypothesisById(userId, id, db);
    if (!hypothesis) {
        redirect(301, "/new");
    }
    console.log("userId", userId, 'hypotheses', hypothesis);
    return {hypothesis};
}