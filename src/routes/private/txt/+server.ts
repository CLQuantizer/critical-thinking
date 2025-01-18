import {json} from "@sveltejs/kit";
import {chunkText} from "$lib/server/services/chunking";
import {documentsTable, paragraphsTable} from "$lib/server/db/schema";
import {eq} from "drizzle-orm";
import {CHAR_PER_PAGE, sanitize} from "$lib/client/common";
import {tokenizeFrenchParagraph} from "$lib/server/services/tokenizeFrench";


export const POST = async ({request, locals}:any) => {
    try {
        // this is an example of how to handle that request
        const body = await request.json();
        const data = body.file;
        const name = body.name;
        const text = data.text;
        if (!text) {
            return json({"error": "No text found"});
        }
        const paragraphs = chunkText(text, 1500);
        if (!paragraphs) {
            return json({"error": "No paragraphs found"});
        }
        const db = locals.db;
        // select by name, if exists, return error
        const doc = await db.select()
            .from(documentsTable)
            .where(eq(documentsTable.name, name));
        if (doc.length > 0) {
            return json({error: "Document already exists"});
        }
        await db.insert(documentsTable)
            .values({name, start: 0, status: 1, pages: 0, priceId: "free"})
        const docId = await db.select()
            .from(documentsTable)
            .where(eq(documentsTable.name, name))
            .then((res:any) => res[0].id);
        let cumCharCount = 0;
        for (const [i, paragraph] of paragraphs.entries()) {
            const text = sanitize(paragraph);
            const parse = tokenizeFrenchParagraph(text);
            cumCharCount += text.length;
            const page = Math.floor(cumCharCount / CHAR_PER_PAGE);
            // verify that page-1 is already in the db
            await db.insert(paragraphsTable).values({docId, text, parse, cumCharCount, page});
            await new Promise(r => setTimeout(r, 1));
            console.log(`Paragraph saved, ${i+1} of ${paragraphs.length}`)
        }
        const pageNum = Math.floor(cumCharCount / CHAR_PER_PAGE);
        await db.update(documentsTable)
            .set({pages: pageNum})
            .where(eq(documentsTable.id, docId));
        console.log("Number of paragraphs: ", paragraphs.length);
        return json({message: "Document saved"});
    } catch (e) {
        console.error(e);
        return json({error: "An error occurred"});
    }
}