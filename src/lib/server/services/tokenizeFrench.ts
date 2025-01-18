import {type Para, paragraphSchema, type Sentence, type Token} from "$lib/client/schemas";
import {PUNCT, WORD} from "$lib/client/common";

export const tokenizeFrenchParagraph = (paragraph: string): Para => {
    const sentences = splitSentences(paragraph);
    const tokenizedSentences: Sentence[] = sentences.map(sentence => {
        const tokens = tokenizeSentence(sentence);
        return { sentence, tokens };
    });
    const result: Para = {
        paragraph: paragraph,
        sentences: tokenizedSentences,
    };
    return paragraphSchema.parse(result);
};

// Helper function to split a paragraph into sentences
const splitSentences = (paragraph: string): string[] => {
    // Basic split using punctuation, considering French specifics
    return paragraph
        .replace(/([.?!])\s*(?=[A-ZÀ-ÖØ-öø-ÿ])/g, "$1|") // Split at end of sentence punctuation
        .replace(/«\s*/g, "«|") // Split before opening quotation marks
        .replace(/\s*»/g, "|»") // Split after closing quotation marks
        .split("|")
        .map(s => s.trim())
        .filter(s => s.length > 0);
};

// Helper function to tokenize a sentence into words and punctuation
const tokenizeSentence = (sentence: string): Token[] => {
    const tokens: Token[] = [];
    const wordRegex = /[a-zA-ZÀ-ÖØ-öø-ÿ0-9]+(?:['-][a-zA-ZÀ-ÖØ-öø-ÿ0-9]+)*/;

    // Split the sentence into tokens using regex
    let match;
    let lastIndex = 0;

    while ((match = wordRegex.exec(sentence.slice(lastIndex))) !== null) {
        // Check if there's any punctuation before the word
        const beforeWord = sentence.slice(lastIndex, lastIndex + match.index);
        if (beforeWord.trim()) {
            for (const char of beforeWord) {
                if (char.trim()) {
                    tokens.push({ token: char, pos: PUNCT });
                }
            }
        }

        // Add the word token
        tokens.push({ token: match[0], pos: WORD });

        lastIndex += match.index + match[0].length;
    }

    // Add any remaining punctuation
    const remaining = sentence.slice(lastIndex);
    if (remaining.trim()) {
        for (const char of remaining) {
            if (char.trim()) {
                tokens.push({ token: char, pos: PUNCT });
            }
        }
    }

    return tokens;
};