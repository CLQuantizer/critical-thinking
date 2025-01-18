import {test, expect} from "vitest"
import {chunkText} from "$lib/server/services/chunking";
import {tokenizeFrenchParagraph} from "$lib/server/services/tokenizeFrench";
import {tokenizeEnglishParagraph} from "$lib/server/services/tokenizeEnglish";

test.only("test chunking", async () => {
    // select 1 is a simple query that returns 1
    const x = chunkText("test", 1000);
    console.log(x);
}, { timeout: 100000 });

test.only("test english tokenizing", async () => {
    // select 1 is a simple query that returns 1
    const x = tokenizeEnglishParagraph("How are you, my friend?");
    expect(x.sentences[0].sentence).toBe("How are you, my friend?");
    expect(x.sentences[0].tokens.length).toBe(7);
    const y = tokenizeEnglishParagraph("Next year is 2022.");
    expect(y.sentences[0].tokens.length).toBe(5);
});

test.only("test french tokenizing", async () => {
    // select 1 is a simple query that returns 1
    const x = tokenizeFrenchParagraph("Cette anneé est 2022.");
    expect(x.sentences.length).toBe(1);
    expect(x.sentences[0].tokens.length).toBe(5);
    const y = tokenizeFrenchParagraph("Bonjour, comment ça va?");
    expect(y.sentences.length).toBe(1);
    expect(y.sentences[0].tokens.length).toBe(6);
});
