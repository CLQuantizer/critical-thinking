import {sqliteTable, text, integer, } from "drizzle-orm/sqlite-core";

// change to sqllite
// CREATE TABLE hypotheses (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     text TEXT NOT NULL,
//     context TEXT NOT NULL,
//     status INTEGER NOT NULL DEFAULT 0,
//     created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
//     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
// );

export const hypothesesTable = sqliteTable('hypotheses', {
    id: integer('id').primaryKey(),
    text: text('text').notNull(),
    context: text('context').notNull(),
    hash: text('hash').notNull(),
    status: integer('status').notNull().default(0),
});