import {json} from "@sveltejs/kit";
import {searchContextByWord} from "$lib/server/services/context";
import {selectWord} from "$lib/server/db/queries";

export const load = async (event) => {
    const db = event.locals.db;
    const w = "dessin"
    const word = await selectWord(w, db);
    if (!word) {
        return json({error: "Word not found"});
    }
    const contexts = await searchContextByWord(word.word, db)
    return {word, contexts};
}