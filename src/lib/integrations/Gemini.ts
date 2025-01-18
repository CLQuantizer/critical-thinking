import {createGoogleGenerativeAI} from '@ai-sdk/google';
import { z } from 'zod';
import {AI, ALTERNATIVE_HYPOTHESES_PROMPT} from '$env/static/private';
import {generateObject} from "ai";

const GeminiClient = createGoogleGenerativeAI({apiKey:AI})
export const GEMINI_POWER = GeminiClient("gemini-2.0-flash-001");

const alternativeHypothesesResult = z.object({
    options: z.array(z.object({name: z.string(), text: z.string()}))})

const generateAlternativeHypothesesPrompt = (hypothesis: string, context:string) =>
    ALTERNATIVE_HYPOTHESES_PROMPT
        .replace('{{context}}', context)
        .replace('{{hypothesis}}', hypothesis);

export const generateAlternativeHypotheses = async (hypothesis: string, context:string) => {
    const resp = await generateObject({
        model: GEMINI_POWER,
        prompt: generateAlternativeHypothesesPrompt(hypothesis, context),
        maxTokens: 600,
        schema: alternativeHypothesesResult
    });
    return resp.object.options;
}