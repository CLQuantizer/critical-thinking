import {test, expect} from "vitest";
import ky from "ky";
import {sleep} from "openai/core";

test.only("test wiki media", async () => {
    // let t: string = "Bolivia";
    // const articles = await getWikiArticles(t);
    const articles = ["Paris"];
    console.log(articles);
    for (let article of articles) {
        const extract = await ky.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(article)}`)
          .json() as { extract: string, type: string };
        if (extract.type === "standard") {
            console.log(extract.extract + "\n");
        }
    }
}, {timeout: 2000});

const lock = new Set<string>();
// define a function that runs for 5 seconds
const processWordAsync = async (word: string) => {
    if (lock.has(word)) {
        console.log("Word is already being processed");
        return new Error("Word is already being processed");
    }
    lock.add(word);
    await sleep(5000);
    lock.delete(word);
    console.log("Word processed");
    return word;
}

test.only("test set lock for concurrent requests", async () => {
    const word = "apple";
    const concurrentRequests = 5;
    const processedResults:any = [];

    // Create an array of promises for concurrent requests
    const requests = Array(concurrentRequests).fill(null).map(() =>
        processWordAsync(word)
            .then(result => processedResults.push(result))
            .catch(error => processedResults.push(error))
    );

    // Wait for all requests to complete
    await Promise.all(requests);

    // Assert that only one successful processing occurred
    const successfulProcessings = processedResults.filter((result:any) => !(result instanceof Error));
    expect(successfulProcessings.length).toBe(1);

    // Assert that the rest were blocked due to lock
    const blockedRequests = processedResults.filter((result:any) =>
        result instanceof Error && result.message === "Word is already being processed"
    );
    expect(blockedRequests.length).toBe(concurrentRequests - 1);
}, 10000); // Adjust timeout as needed