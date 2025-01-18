import { z } from 'zod';
import {zodResponseFormat} from "openai/helpers/zod";
import {openai} from "$lib/integrations/openai/client";
import {MEANING_SYSTEM_PROMPT, MEANING_PROMPT_TEMPLATE} from "$env/static/private"

const MeaningResult = z.object({meaning: z.string()});

const generateMeaningPrompt = (word: string, context: string) => `
    You are a brilliant professional French lexicographer.
    I encountered this word: "${word}" in the context of "${context}".
    Please provide an easy-to-understand explanation of the meaning of "${word}" in English.
    The explanation must be in English. You will be penalized $20 if you provide non-English content.
    Now, take a deep breath and think step by step:
    first, consider the context in which this word can be used.
    This explanation should be similar to a term in an English dictionary.
    Keep it short and simple, under 12 words.`;

export const getWordContextualMeaning = async (word: string, context: string) => {
    const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o", // Updated to use English model identifier
        messages: [
            { role: "system", content: "You are an expert English lexicographer." },
            { role: "user", content: generateMeaningPrompt(word, context) },
        ],
        temperature: 0.5,
        response_format: zodResponseFormat(MeaningResult, "meaning"),
    });
    const res = completion.choices[0].message.parsed;
    if (!res) {
        throw new Error("Failed to generate meaning for the word.");
    }
    return res.meaning;
}

const generateTargetMeaningPrompt = (word: string, context: string) => MEANING_PROMPT_TEMPLATE
        .replace(/{word}/g, word)
        .replace(/{context}/g, context)

export const genWordTargetContextualMeaning = async (word: string, context: string) => {
    const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o",
        messages: [
            {role: "system", content: MEANING_SYSTEM_PROMPT},
            {role: "user", content: generateTargetMeaningPrompt(word, context)},
        ],
        temperature: 0.5,
        response_format: zodResponseFormat(MeaningResult, "meaning"),
    });

    const res = completion.choices[0].message.parsed;
    if (!res) {
        throw new Error("単語の意味の生成に失敗しました。");
    }
    return res.meaning;
}

export const getWordMeaningsInBothLanguages = async (word: string, context: string) => {
    const startTime = performance.now();

    try {
        const [target, base] = await Promise.all([
            genWordTargetContextualMeaning(word, context),
            getWordContextualMeaning(word, context)
        ]);

        const endTime = performance.now();
        console.log(`Time taken: ${endTime - startTime}ms`);

        return {target, base};
    } catch (error) {
        const endTime = performance.now();
        console.log(`Time taken (with error): ${endTime - startTime}ms`);
        throw new Error(`Failed to get 2 meanings: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};