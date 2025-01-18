import {z} from "zod";
import {error, json, type RequestEvent} from "@sveltejs/kit";
import {tokenizeEnglishParagraph} from "$lib/server/services/tokenizeEnglish";

export const POST = async ({request}:RequestEvent) => {
    try {
        const body = await request.json();
        return json(tokenizeEnglishParagraph(z.string().parse(body.text)));
    } catch (e) {
        return error(400, "Bad request");
    }
}