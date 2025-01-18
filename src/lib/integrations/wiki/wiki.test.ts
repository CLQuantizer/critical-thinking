import {test} from "vitest";
import ky from "ky";

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