import {json} from "@sveltejs/kit";
import {selectWord} from "$lib/server/db/queries";

export const load = async (event) => {
    const db = event.locals.db;
    const w = "dessin"
    const word = await selectWord(w, db);
    if (!word) {
        return json({error: "Word not found"});
    }
    return {word};
}