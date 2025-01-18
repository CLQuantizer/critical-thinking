import { z } from 'zod';
import {zodResponseFormat} from "openai/helpers/zod";
import {openai} from "$lib/integrations/openai/client";

const LearningSummaryResult = z.object({summary: z.string()});
const EncouragementResult = z.object({encouragement: z.string()});

const generateLearningSummaryPrompt = (words: string[]) => `我在全法語環境中工作，每天需要學習法語。
    最近, 我學習了一些新的法語單詞，包括：${words.join(", ")}。請簡單列出這些選定的單詞及其翻譯。
    然後用一句簡短的激勵語鼓勵我繼續學習。請使用繁體中文!`

export const generateLearningSummary = async (words: string[]) => {
    const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-2024-08-06",
        messages: [
            { role: "system", content: "請列出這些單詞及其翻譯, 例如 pomme (蘋果)" },
            { role: "user", content: generateLearningSummaryPrompt(words) },
        ],
        max_tokens: 500,
        temperature: 0.7,
        response_format: zodResponseFormat(LearningSummaryResult, "summary"),
    });
    const res = completion.choices[0].message.parsed;
    if (!res) {
        throw new Error("Failed to generate image description.");
    }
    return res.summary;
}

export const generateEncouragement = async () => {
    const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-2024-08-06",
        messages: [
            { role: "system", content: "使用者在全法語環境中工作，每天需要學習法語 - 但今天尚未實現學習 10 個法語單字的目標, 請給予鼓勵。" },
            { role: "user", content: "我今天沒有多大成就，你能用勵志的或善意的話語來鼓勵我嗎? 請使用繁體中文說一句，然後用法語說一句" },
        ],
        max_tokens: 300,
        temperature: 0.9,
        response_format: zodResponseFormat(EncouragementResult, "encouragement"),
    });
    const res = completion.choices[0].message.parsed;
    if (!res) {
        throw new Error("Failed to generate image description.");
    }
    return res.encouragement;
}