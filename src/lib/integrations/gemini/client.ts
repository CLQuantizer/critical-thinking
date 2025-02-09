import {createGoogleGenerativeAI} from "@ai-sdk/google";
import {AI} from "$env/static/private";

export const GEMINI_POWER = createGoogleGenerativeAI({apiKey:AI})("gemini-2.0-flash-001");