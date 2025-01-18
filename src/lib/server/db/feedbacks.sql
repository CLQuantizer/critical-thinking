CREATE TABLE feedbacks
(
    -- id is auto incremented
    id        SERIAL PRIMARY KEY,
    user_id   INTEGER,
    email     TEXT NOT NULL,
    feedback  TEXT NOT NULL,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE page_flags
(
    -- id is auto incremented
    id        SERIAL PRIMARY KEY,
    email     TEXT NOT NULL REFERENCES users(email),
    doc_id     INTEGER NOT NULL REFERENCES documents(id),
    page      INTEGER NOT NULL,
    feedback  TEXT NOT NULL DEFAULT '',
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- unique by email and page and doc_id
CREATE UNIQUE INDEX page_flags_unique ON page_flags(email, doc_id, page);