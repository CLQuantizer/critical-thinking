import {z} from "zod";
import {redirect} from "@sveltejs/kit";

export const load = async ({params, parent}) => {
    const {docs} = await parent();
    const idParse = z.number().safeParse(+params.id);
    if (!idParse.success) {
        redirect(303, '/private/collections');
    }
    const id = idParse.data;
    const doc = docs.find((doc:any) => doc.id === id);
    if (!doc) {
        redirect(303, '/private/collections');
    }
    if (doc.purchased) {
        redirect(303, '/private/collections/');
    }
    return {doc};
}
