import {countUserSentences, querySentenceByPage} from "$lib/server/db/queries";

export const load = async ({locals}) => {
    const db = locals.db;
    const uid = locals.user.id;
    const contexts = await querySentenceByPage(uid, 1, db)
    const count = await countUserSentences(uid, db)
    return {contexts, count}
}