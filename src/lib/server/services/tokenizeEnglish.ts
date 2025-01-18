import {type Para, paragraphSchema, type Sentence, type Token} from "$lib/client/schemas";
import {PUNCT, WORD} from "$lib/client/common";

export const tokenizeEnglishParagraph = (paragraph: string): Para => {
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

const splitSentences = (paragraph: string): string[] => {
    const abbreviations = /Mr\.|Mrs\.|Ms\.|Dr\.|Prof\.|Sr\.|Jr\.|U\.S\.|U\.K\.|i\.e\.|e\.g\./g;
    let text = paragraph;
    const abbrevMap = new Map();
    let counter = 0;

    text = text.replace(abbreviations, (match) => {
        const placeholder = `__ABB${counter}__`;
        abbrevMap.set(placeholder, match);
        counter++;
        return placeholder;
    });

    const sentences = text
        .replace(/([.!?])\s+(?=[A-Z])/g, "$1|")
        .replace(/([.!?]["'])\s+(?=[A-Z])/g, "$1|")
        .replace(/([.!?])\s*["']\s+(?=[A-Z])/g, "$1|")
        .split("|")
        .map(s => s.trim())
        .filter(s => s.length > 0);

    return sentences.map(sentence => {
        let restored = sentence;
        abbrevMap.forEach((value, key) => {
            restored = restored.replace(key, value);
        });
        return restored;
    });
};

const tokenizeSentence = (sentence: string): Token[] => {
    const tokens: Token[] = [];
    // Updated regex to include numbers and number-related patterns
    let currentToken = "";
    let i = 0;

    while (i < sentence.length) {
        const char = sentence[i];

        // Handle letters, numbers, contractions, and hyphens
        if (
            char.match(/[a-zA-Z0-9]/) ||
            (char === "'" && i + 1 < sentence.length && sentence[i + 1].match(/[a-zA-Z]/)) ||
            (char === "-" && i + 1 < sentence.length && sentence[i + 1].match(/[a-zA-Z0-9]/)) ||
            (char === "." && currentToken.match(/^\d+$/) && i + 1 < sentence.length && sentence[i + 1].match(/\d/))
        ) {
            currentToken += char;
        } else {
            if (currentToken) {
                tokens.push({ token: currentToken, pos: WORD });
                currentToken = "";
            }
            if (char.trim() !== "") {
                if (char.match(/[.!?]/) && i + 1 < sentence.length && sentence[i + 1].match(/[.!?]/)) {
                    let punct = char;
                    while (i + 1 < sentence.length && sentence[i + 1].match(/[.!?]/)) {
                        i++;
                        punct += sentence[i];
                    }
                    tokens.push({ token: punct, pos: PUNCT });
                } else {
                    tokens.push({ token: char, pos: PUNCT });
                }
            }
        }
        i++;
    }

    if (currentToken) {
        tokens.push({ token: currentToken, pos: WORD });
    }

    return tokens;
};