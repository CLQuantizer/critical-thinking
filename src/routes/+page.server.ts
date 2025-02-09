import {redirect} from "@sveltejs/kit";

export const load = async ({ locals, parent }) => {
    const {hypotheses} = await parent()
    const userId = locals.userId;
    console.log("userId", userId, 'hypotheses', hypotheses.length);
    // if length > 0, take the id of the first hypothesis and redirect to /think/[id]
    const timestamp = Date.now();
    if (hypotheses.length === 0) {
        redirect(307, '/new?timestamp=' + timestamp);
    } else {
        redirect(307, `/${hypotheses[0].id}?timestamp=${timestamp}`);
    }
}