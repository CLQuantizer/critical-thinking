import {test, expect} from "vitest"
import ky from "ky";
import {generateAlternativeHypotheses} from "$lib/integrations/gemini/Gemini";

test.only("test hypo", async () => {
    const x = await generateAlternativeHypotheses("The earth is flat",
        "I live on the earth without seeing the curvature");
    console.log(x);
    // x should be of length 3
    expect(x).toHaveLength(2);
}, { timeout: 10000 });

test.only("test post", async () => {
    const x = await ky.post("https://critical-thinking.pages.dev/think", {
        json: {
            "hypothesis": "The earth is flat",
            "context": "I live on the earth"
        }}).json();
    console.log(x);
});