CREATE TABLE words
(
    -- id is auto incremented
    id       SERIAL PRIMARY KEY,
    word      TEXT      NOT NULL UNIQUE,
    hash      TEXT      NOT NULL UNIQUE,
    status   INTEGER   NOT NULL DEFAULT 0,
    --       timestamp is default
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_words
(
    -- id is auto incremented
    id       SERIAL PRIMARY KEY,
    user_id  INTEGER REFERENCES users (id) ON DELETE CASCADE,
    word     TEXT   REFERENCES words (word) ON DELETE CASCADE,
    status   INTEGER   NOT NULL DEFAULT 0,
    --       timestamp is default
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp
);

-- create a unique index on word and user_id
CREATE UNIQUE INDEX user_words_word_user_id_idx ON user_words (word, user_id);

CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_words_updated_at
    BEFORE UPDATE ON user_words
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();