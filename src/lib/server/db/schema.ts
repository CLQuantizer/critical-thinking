import {sqliteTable, text, integer, } from "drizzle-orm/sqlite-core";

// CREATE TABLE hypotheses (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     text TEXT NOT NULL,
//     user_id TEXT NOT NULL,
//     context TEXT NOT NULL,
//     hash TEXT NOT NULL UNIQUE,
//     status INTEGER NOT NULL DEFAULT 0,
//     created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
//     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
// );
export const hypothesesTable = sqliteTable('hypotheses', {
    id: integer('id').primaryKey(),
    text: text('text').notNull(),
    userId: text('user_id').notNull(),
    context: text('context').notNull(),
    hash: text('hash').notNull(),
    status: integer('status').notNull().default(0),
    createdAt: integer('created_at', { mode: 'timestamp' }),
    updatedAt: integer('updated_at', { mode: 'timestamp' }),
});

// -- DDL for SQLite
//     CREATE TABLE change_logs (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     hypothesis_id INTEGER NOT NULL,
//     user_id TEXT NOT NULL,
//     content TEXT NOT NULL,
//     change_type INTEGER NOT NULL,  -- 0=context, 1=hypothesis
// reason TEXT,
//     timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (hypothesis_id) REFERENCES hypotheses(id)
// );
//
// -- Optional: Add indexes for better query performance
// CREATE INDEX idx_change_logs_hypothesis_id ON change_logs(hypothesis_id);
// CREATE INDEX idx_change_logs_user_id ON change_logs(user_id);
// CREATE INDEX idx_change_logs_timestamp ON change_logs(timestamp);

// Define the type of change
export const ChangeType = {
    CONTEXT: 0,
    HYPOTHESIS: 1,
} as const;

export const changeLogsTable = sqliteTable('change_logs', {
    id: integer('id').primaryKey(),
    hypothesisId: integer('hypothesis_id').notNull().references(() => hypothesesTable.id),
    userId: text('user_id').notNull(),
    content: text('content').notNull(),  // either context or hypothesis content
    changeType: integer('change_type').notNull(),  // 0 for context, 1 for hypothesis
    reason: text('reason'),
    timestamp: integer('timestamp', { mode: 'timestamp' }),
});