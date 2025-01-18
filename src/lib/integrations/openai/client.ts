import OpenAI from "openai";
import {OPENAI_KEY, OPENAI_BASE_URL} from "$env/static/private";

export const openai = new OpenAI({
    baseURL: OPENAI_BASE_URL,
    apiKey:OPENAI_KEY
});
