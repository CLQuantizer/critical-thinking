create table documents
(
    id        serial primary key,
    name      text not null unique,
    -- sometimes we need to start from a specific page
    -- books are like that
    start     integer,
    status    integer not null default 0,
    description text default '',
    pages     integer not null,
    price_id  text,
    timestamp timestamp default current_timestamp
);

create table pages
(
    id        serial primary key,
    doc_id    INTEGER REFERENCES documents(id) ON DELETE CASCADE,
    content   text not null,
    parse     jsonb not null,
    page      integer not null,
    status    integer not null default 0,
    created_at timestamp default CURRENT_TIMESTAMP not null,
    updated_at timestamp default CURRENT_TIMESTAMP not null
);

create table offsets
(
    id         serial primary key,
    doc_id     INTEGER REFERENCES documents(id) ON DELETE CASCADE,
    user_id    INTEGER REFERENCES users(id) ON DELETE CASCADE,
    -- no foreign key constraint because we put that in the business logic
    page       integer not null,
    created_at timestamp default CURRENT_TIMESTAMP not null,
    updated_at timestamp default CURRENT_TIMESTAMP not null
);

-- unique index on doc_id and user_id
create unique index offsets_doc_user_idx on offsets (doc_id, user_id);

CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_page_updated_at
    BEFORE UPDATE ON pages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_offsets_updated_at
    BEFORE UPDATE ON offsets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();