import {test, expect} from "vitest"
import {generateAlternativeHypotheses} from "$lib/integrations/openai/think";

test.only("test hypo", async () => {
    const x = await generateAlternativeHypotheses("The earth is flat",
        "I live on the earth");
    console.log(x);
    // x should be of length 3
    expect(x).toHaveLength(3);
}, { timeout: 10000 });