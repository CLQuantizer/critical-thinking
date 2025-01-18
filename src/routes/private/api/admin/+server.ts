
import { deleteParaById, selectParaById, updateParaById } from "$lib/server/db/queries";
import { json } from "@sveltejs/kit";
import {type ParaModify, paraModifySchema} from "$lib/client/schemas";
import {z} from "zod";
import {strEqIgnCase} from "$lib/client/common";
import {paragraphsTable} from "$lib/server/db/schema";
import {eq} from "drizzle-orm";
import {tokenizeFrenchParagraph} from "$lib/server/services/tokenizeFrench";

export const POST = async ({ locals, request }: any) => {
    const userId = locals.user.id;
    if (userId !== 1) {
        return json({ error: "Unauthorized" });
    }

    const body = await request.json();
    const old = body.old as ParaModify[];
    // export const paraModifySchema = z.object({
    //     id: z.number(),
    //     text: z.string()
    // });
    // paraModifySchema
    const ops = old.map(p => paraModifySchema.parse(p));
    const db = locals.db;
    const results = [];

    for (const op of ops) {
        try {
            const paraInDb = await selectParaById(op.id, db);
            if (!paraInDb) {
                results.push({
                    id: op.id,
                    success: false,
                    error: "Paragraph not found"
                });
                continue;
            }

            // If text is empty string, delete
            const isTextNonEmpty = z.string().min(1).safeParse(op.text).success;
            if (!isTextNonEmpty) {
                console.log("Deleting paragraph:", op.id);
                await deleteParaById(op.id, db);
                results.push({
                    id: op.id,
                    success: true,
                    operation: "delete"
                });
                continue;
            }

            // Skip if text hasn't changed
            if (strEqIgnCase(paraInDb.text, op.text)) {
                results.push({
                    id: op.id,
                    success: true,
                    operation: "skipped"
                });
                continue;
            }

            // Update with new text
            const parse = tokenizeFrenchParagraph(op.text);
            await updateParaById(op.id, op.text, parse, db);
            console.log("Updated paragraph:", op.id);
            results.push({
                id: op.id,
                success: true,
                operation: "update"
            });
        } catch (error) {
            console.error("Error updating paragraph:", op.id, error);
            results.push({
                id: op.id,
                success: false,
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    }

    const newParagraphParse = z.string().safeParse(body.new);
    if (!newParagraphParse.success) {
        return json({
            success: true,
            results: results
        });
    }
    const newParagraph = newParagraphParse.data;
    const parse = tokenizeFrenchParagraph(newParagraph);
    const latestOld = old.reduce((acc, cur) => cur.id > acc.id ? cur : acc, { id: 0 });
    const latest = await db.select().from(paragraphsTable).where(eq(paragraphsTable.id, latestOld.id));
    if (latest.length === 0) {
        return json({ error: "Latest paragraph not found" });
    }
    const page = latest[0].page;
    const docId = latest[0].docId;
    await db.insert(paragraphsTable).values({ text: newParagraph, parse, cumCharCount: latest[0].cumCharCount + newParagraph.length, page, docId })
    return json({
        success: true,
        results: results
    });
}