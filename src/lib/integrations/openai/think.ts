import { z } from 'zod';
import {zodResponseFormat} from "openai/helpers/zod";
import {openai} from "$lib/integrations/openai/client";
import {ALTERNATIVE_HYPOTHESES_PROMPT, ALTERNATIVE_HYPOTHESES_SYSTEM} from "$env/static/private";

const alternativeHypothesesResult = z.object({
        options: z.array(z.object({name: z.string(), text: z.string()}))})

const generateAlternativeHypothesesPrompt = (hypothesis: string, context:string) =>
    ALTERNATIVE_HYPOTHESES_PROMPT
        .replace('{{context}}', context)
        .replace('{{hypothesis}}', hypothesis);

export const generateAlternativeHypotheses = async (hypothesis: string, context:string) => {
    const userPrompt = generateAlternativeHypothesesPrompt(hypothesis, context);
    const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o",
        messages: [
            { role: "system", content: ALTERNATIVE_HYPOTHESES_SYSTEM },
            { role: "user", content: userPrompt },
        ],
        max_tokens: 600,
        response_format: zodResponseFormat(alternativeHypothesesResult, "options"),
    });
    const res = completion.choices[0].message.parsed;
    if (!res) {
        throw new Error("Failed to generate image description.");
    }
    return res.options;
}