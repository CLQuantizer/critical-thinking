-- contexts are saved automatically
CREATE TABLE contexts (
    id SERIAL PRIMARY KEY,
    -- text should be unique
    text TEXT NOT NULL,
    hash TEXT NOT NULL UNIQUE,
    translation TEXT NOT NULL,
    -- structured: sentence[]<word[]>
    parse JSONB NOT NULL,
    status INTEGER NOT NULL DEFAULT 0,
    vec TSVECTOR,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX text_vector_idx ON contexts USING GIN (vec);


-- sentences are just contexts with a user_id, saved manually
CREATE TABLE sentences
(
    -- id is auto incremented
    id        SERIAL PRIMARY KEY,
    -- uid references the users table
    user_id   INTEGER REFERENCES users (id) ON DELETE CASCADE,
    context_id INTEGER REFERENCES contexts (id) ON DELETE CASCADE,
    status    INTEGER   NOT NULL DEFAULT 0,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
-- create a unique index on user_id and text columns
CREATE UNIQUE INDEX sentences_uid_text_index ON sentences (user_id, context_id);