// import {PromptTemplate} from "langchain/prompts";
// import {StructuredOutputParser} from "langchain/output_parsers";
// import {z} from "zod";
// import {BACKBONE_LLM} from "../../LLMService/ChainConfig";
//
// const inferWikiArticleSchema = z.object({
//     articles: z.array(z.string()).min(1).describe("possible article names"),
// });
// const inferWikiArticleParser = StructuredOutputParser.fromZodSchema(inferWikiArticleSchema);
// //the prompt
// const inferWikiArticlePrompt = new PromptTemplate({
//     inputVariables: ["text"],
//     template: "I want to find out more about the following text: \"{text}\". " +
//         "Please suggest a few Wikipedia article that I can read about it. " +
//         "Specifically, I will choose an article to call the endpoint: https://en.wikipedia.org/api/rest_v1/page/summary/[article] " +
//         "I just need the names, do not give any description." +
//         "You'll be fined $20 if the endpoint returns an error for all of them (e.g. article not found)." +
//         "\n{formatInstructions}.",
//     partialVariables: {"formatInstructions": inferWikiArticleParser.getFormatInstructions()}
// });
//
// export const getWikiArticles = async (text: string) => {
//     let input = await inferWikiArticlePrompt.format({text: text});
//     const resp = await BACKBONE_LLM.call(input);
//     return await inferWikiArticleParser.parse(resp).then(res => res.articles);
// }
