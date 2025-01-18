import {z} from "zod";
import {TRANSLATE_WORKER_URL} from "$env/static/private";

export const french2English = async (text:string) => {
    const res = await fetch(TRANSLATE_WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            text,
            source_lang: "fr",
            target_lang: "en"
        })
    }).then(r => r.json());

    if (res.error) throw new Error(res.error);
    return z.string().min(1, "translation API call failed").parse(res.translated_text);
}