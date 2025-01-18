import {z} from "zod";
import {tokenizeFrenchParagraph} from "$lib/server/services/tokenizeFrench";
import {error, json, type RequestEvent} from "@sveltejs/kit";

export const POST = async ({request}:RequestEvent) => {
    try {
        const body = await request.json();
        const text = z.string().parse(body.text);
        return json(tokenizeFrenchParagraph(text));
    } catch (e) {
        return error(400, "Bad request");
    }
}