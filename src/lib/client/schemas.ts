import {z} from "zod";

export const posSchema = z.enum(["WORD", "PUNCT"])

export const tokenSchema = z.object({
    token: z.string(),
    pos: z.string(),
});

export type Token = z.infer<typeof tokenSchema>;
export type Sentence = z.infer<typeof sentenceSchema>;
export const sentenceSchema = z.object({
    sentence: z.string().min(1, "sentence cannot be empty"),
    tokens: z.array(tokenSchema),
});

export const paragraphSchema = z.object({
    paragraph: z.string().min(1, "paragraph cannot be empty"),
    sentences: z.array(sentenceSchema).min(1, "paragraph must have at least one sentence"),
});

export type Para = z.infer<typeof paragraphSchema>;


const wicSchema = z.object({
    exp: paragraphSchema.nullish(),
    base: z.string().nullish(),
    hash: z.string().nullish(),
})

export type WIC = z.infer<typeof wicSchema>;

export const sentCardSchema = z.object({
    id: z.string(),
    hash: z.string(),
    sentence: z.string(),
    translation: z.string(),
});

export type SentCard = z.infer<typeof sentCardSchema>;

export const sent2Para = (s: Sentence) =>
    ({paragraph: s.sentence, sentences: [s]});

export type WordResp =  { exp: Para, base: string, hash: string, error: string, word: string, context: { hash: string, translation: string } }

// Schema for each operation - just id and text
export const paraModifySchema = z.object({
    id: z.number(),
    text: z.string()
});

export type ParaModify = z.infer<typeof paraModifySchema>;

export type Hypothesis = {
    id: number
    text: string;
    context: string;
    hash: string;
    status: number;
}