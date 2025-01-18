CREATE TABLE wics
(
    id SERIAL PRIMARY KEY,
    hash TEXT NOT NULL,
    word TEXT NOT NULL REFERENCES words(word) ON DELETE CASCADE,
    context TEXT NOT NULL,
    translation TEXT NOT NULL,
    explanation JSONB NOT NULL,
    status INTEGER NOT NULL DEFAULT 0,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX wics_hash_word_index ON wics (hash, word);