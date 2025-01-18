import {redirect} from "@sveltejs/kit";

export const load = async ({locals}) => {
    const userId = locals.user.id;
    if (userId!==1) {
        redirect(301, "/")
    }
    
}