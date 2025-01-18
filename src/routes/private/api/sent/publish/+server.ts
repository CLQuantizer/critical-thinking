import {json} from "@sveltejs/kit";
import {publishBlog} from "$lib/server/db/queries";

export const POST = async ({locals, request}) => {
    try {
        const uid = locals.user.id;
        if (uid!==1){
            return json({error:"You are not allowed to publish"})
        }
        const {text, translation, hash, remark} = await request.json();
        await publishBlog(text, translation, hash, remark, locals.db);
        return json({success:true})
    } catch (e:any){
        return json({error:e.message})
    }
}