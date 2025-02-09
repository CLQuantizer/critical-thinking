import { z } from 'zod';
import {ALTERNATIVE_HYPOTHESES_PROMPT} from '$env/static/private';
import {generateObject} from "ai";
import {GEMINI_POWER} from "$lib/integrations/gemini/client";

export const generateAlternativeHypotheses = async (hypothesis: string, context:string) =>
    await generateObject({
        model: GEMINI_POWER,
        prompt: ALTERNATIVE_HYPOTHESES_PROMPT
            .replace('{{context}}', context)
            .replace('{{hypothesis}}', hypothesis),
        maxTokens: 600,
        schema: z.object({options: z.array(z.object({name: z.string(), text: z.string()}))})
    }).then(resp => resp.object.options);