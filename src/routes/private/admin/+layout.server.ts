import {redirect} from "@sveltejs/kit";

export const load = ({locals}:any)=>{
    const user = locals.user;
    if (user.id !== 1) {
        return redirect(303, '/private/collections');
    }
    return {user};
}