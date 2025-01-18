-- blogs are string with comment
CREATE TABLE blogs
(
    -- id is auto incremented
    id        SERIAL PRIMARY KEY,
    text      TEXT NOT NULL,
    translation TEXT NOT NULL,
    remark   TEXT NOT NULL,
    hash     TEXT NOT NULL REFERENCES contexts (hash) ON DELETE CASCADE,
    status    INTEGER   NOT NULL DEFAULT 0,
    created_at timestamp default CURRENT_TIMESTAMP not null,
    updated_at timestamp default CURRENT_TIMESTAMP not null
);
-- create a unique index on hash
CREATE UNIQUE INDEX blogs_hash_idx ON blogs (hash);