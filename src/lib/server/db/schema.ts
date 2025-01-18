import {pgTable, serial, text, integer, unique, timestamp, jsonb} from "drizzle-orm/pg-core";
import {createSelectSchema} from "drizzle-zod";
import {z} from "zod";

// create table users (
//     id serial primary key,
//     uid text not null,
//     email text not null,
//     username text,
//     status integer not null default 0,
//     created_at timestamp not null default current_timestamp,
//     updated_at timestamp not null default current_timestamp
// );

export const usersTable = pgTable('users', {
    id: serial('id').primaryKey(),
    uid: text('uid').notNull(),
    email: text('email').unique().notNull(),
    username: text('username'),
    status: integer('status').notNull().default(0),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
}, t => ({
    unq1: unique().on(t.uid),
    unq3: unique().on(t.username)
    })
);

// create table documents
// (
//     id        serial primary key,
//     name      text not null unique,
//     -- sometimes we need to start from a specific page
// -- books are like that
// start     integer,
//     status    integer not null default 0,
//     pages     integer not null,
//     timestamp timestamp default current_timestamp
// );

export const documentsTable = pgTable('documents', {
    id: serial('id').primaryKey(),
    name: text('name').notNull().unique(),
    start: integer('start'),
    status: integer('status').notNull().default(0),
    pages: integer('pages').notNull(),
    description: text('description'),
    priceId: text('price_id').notNull(),
    timestamp: timestamp('timestamp').defaultNow()
});
// create table page
// (
//     id        serial primary key,
//     doc_id    INTEGER REFERENCES documents(id) ON DELETE CASCADE,
//     content   text not null,
//     parse     jsonb not null,
//     page      integer not null,
//     status    integer not null default 0,
//     created_at timestamp default CURRENT_TIMESTAMP not null,
//     updated_at timestamp default CURRENT_TIMESTAMP not null
// );

export const pagesTable = pgTable('pages', {
    id: serial('id').primaryKey(),
    docId: integer('doc_id'),
    content: text('content').notNull(),
    parse: jsonb('parse').notNull(),
    page: integer('page').notNull(),
    status: integer('status').notNull().default(0),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
});

// create table offsets
// (
//     id         serial primary key,
//     doc_id     INTEGER REFERENCES documents(id) ON DELETE CASCADE,
//     -- no foreign key constraint because we put that in the business logic
//     page       integer not null,
//     created_at timestamp default CURRENT_TIMESTAMP not null,
//     updated_at timestamp default CURRENT_TIMESTAMP not null
// );

export const offsetsTable = pgTable('offsets', {
    id: serial('id').primaryKey(),
    user_id: integer('user_id'),
    docId: integer('doc_id'),
    page: integer('page').notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
});

// -- contexts are saved automatically
// CREATE TABLE contexts (
//     id SERIAL PRIMARY KEY,
//     -- text should be unique
// text TEXT NOT NULL,
//     hash TEXT NOT NULL UNIQUE,
//     status INTEGER NOT NULL DEFAULT 0,
//     vec TSVECTOR,
//     timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     translation TEXT NOT NULL,
//     -- structured: sentence[]<word[]>
// parse JSONB NOT NULL
// );

export const contextsTable = pgTable('contexts', {
    id: serial('id').primaryKey(),
    text: text('text').notNull(),
    hash: text('hash').notNull().unique(),
    status: integer('status').notNull().default(0),
    timestamp: timestamp('timestamp').defaultNow(),
    translation: text('translation').notNull(),
    parse: jsonb('parse').notNull()
});

export const contextInDbSchema = createSelectSchema(contextsTable);
export type ContextInDb = z.infer<typeof contextInDbSchema>;

// -- sentences are just contexts with a user_id, saved manually
// CREATE TABLE sentences
// (
//     -- id is auto incremented
// id        SERIAL PRIMARY KEY,
//     -- uid references the users table
// user_id   INTEGER REFERENCES users (id) ON DELETE CASCADE,
//     context_id INTEGER REFERENCES contexts (id) ON DELETE CASCADE,
//     status    INTEGER   NOT NULL DEFAULT 0,
//     timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
// );

export const sentencesTable = pgTable('sentences', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull(),
    contextId: integer('context_id').notNull(),
    status: integer('status').notNull().default(0),
    timestamp: timestamp('timestamp').defaultNow()
});

//CREATE TABLE words
// (
//     -- id is auto incremented
//     id       SERIAL PRIMARY KEY,
//     word      TEXT      NOT NULL UNIQUE,
//     translation TEXT    NOT NULL,
//     meaning  TEXT      NOT NULL,
//     -- parsed meaning
//     parse    JSONB     NOT NULL,
//     status   INTEGER   NOT NULL DEFAULT 0,
//     --       timestamp is default
//     timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
// );

export const wordsTable = pgTable('words', {
    id: serial('id').primaryKey(),
    word: text('word').notNull().unique(),
    hash: text('hash').notNull().unique(),
    status: integer('status').notNull().default(0),
    timestamp: timestamp('timestamp').defaultNow()
});

export const wordInDbSchema = createSelectSchema(wordsTable);
export type WordInDb = z.infer<typeof wordInDbSchema>;

// CREATE TABLE user_words
// (
//     -- id is auto incremented
//     id       SERIAL PRIMARY KEY,
//     user_id  INTEGER REFERENCES users (id) ON DELETE CASCADE,
//     word     TEXT   REFERENCES words (word) ON DELETE CASCADE,
//     status   INTEGER   NOT NULL DEFAULT 0,
//     --       timestamp is default
//     created_at timestamp not null default current_timestamp,
//     updated_at timestamp not null default current_timestamp
// );

export const userWordsTable = pgTable('user_words', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull(),
    word: text('word').notNull(),
    status: integer('status').notNull().default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
});

//CREATE TABLE purchases (
//                            id SERIAL PRIMARY KEY,
//                            email TEXT NOT NULL,
//                            document_id INTEGER NOT NULL,
//                            checkout_session_id TEXT NOT NULL,
//                            status INTEGER NOT NULL DEFAULT 0,
//                            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//                            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//                            FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE,
//                            FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
// );
//
// -- Index for foreign keys to improve query performance
// CREATE INDEX idx_payments_document_id ON purchases(document_id);
// CREATE INDEX idx_payments_email ON purchases(email);

export const purchasesTable = pgTable('purchases', {
    id: serial('id').primaryKey(),
    email: text('email').notNull(),
    docId: integer('document_id').notNull(),
    checkoutSessionId: text('checkout_session_id').notNull(),
    status: integer('status').notNull().default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
});

export const paragraphsTable = pgTable('paragraphs', {
    id: serial('id').primaryKey(),
    docId: integer('doc_id').notNull(),
    text: text('text').notNull(),
    page: integer('page').notNull(),
    parse: jsonb('parse').notNull(),
    cumCharCount: integer('cum_char_count').notNull(),
    status: integer('status').notNull().default(0),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
});

//create table user_logs (
//     id serial primary key,
//     user_id integer not null,
//     doc_id integer not null default -1,
//     page integer not null default -1,
//     action text not null,
//     timestamp timestamp not null default current_timestamp
// );

export const userLogsTable = pgTable('user_logs', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull(),
    docId: integer('doc_id').notNull().default(-1),
    page: integer('page').notNull().default(-1),
    action: text('action').notNull(),
    timestamp: timestamp('timestamp').defaultNow()
});

//CREATE TABLE feedbacks
// (
//     -- id is auto incremented
//     id        SERIAL PRIMARY KEY,
//     user_id   INTEGER,
//     email, TEXT NOT NULL,
//     feedback  TEXT NOT NULL,
//     timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
// );


export const feedbacksTable = pgTable('feedbacks', {
    id: serial('id').primaryKey(),
    userId: integer('user_id'),
    email: text('email').notNull(),
    feedback: text('feedback').notNull(),
    timestamp: timestamp('timestamp').defaultNow()
});

export const pageFlagsTable = pgTable('page_flags', {
    id: serial('id').primaryKey(),
    email: text('email').notNull(),
    docId: integer('doc_id').notNull(),
    page: integer('page').notNull(),
    feedback: text('feedback').notNull(),
    timestamp: timestamp('timestamp').defaultNow()
});

//create table blogs
// (
//     id          serial
//         primary key,
//     text        text                                not null,
//     translation text                                not null,
//     remark      text                                not null,
//     hash        text                              not null,
//         references contexts (hash)
//             on delete cascade,
//     status      integer   default 0                 not null,
//     created_at  timestamp default CURRENT_TIMESTAMP not null,
//     updated_at  timestamp default CURRENT_TIMESTAMP not null
// );

export const blogsTable = pgTable('blogs', {
    id: serial('id').primaryKey(),
    text: text('text').notNull(),
    translation: text('translation').notNull(),
    remark: text('remark').notNull(),
    hash: text('hash').notNull(),
    status: integer('status').notNull().default(0),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
});

export const wicsTable = pgTable('wics', {
    id: serial('id').primaryKey(),
    hash: text('hash').notNull(),
    word: text('word').notNull(),
    context: text('context').notNull(),
    translation: text('translation').notNull(),
    exp: jsonb('explanation').notNull(),
    status: integer('status').notNull().default(0),
    timestamp: timestamp('timestamp').defaultNow()
});