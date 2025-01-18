-- create a paragraphs table if it doesn't exist
CREATE TABLE IF NOT EXISTS paragraphs (
    id SERIAL PRIMARY KEY,
    doc_id INTEGER NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    text TEXT NOT NULL,
    parse JSONB NOT NULL,
    cum_char_count INTEGER NOT NULL, -- cumulative character count, this is for the offset
    page INTEGER NOT NULL,
    status INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- create a trigger to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;

    $$ LANGUAGE plpgsql;

CREATE TRIGGER update_paragraphs_updated_at
    BEFORE UPDATE ON paragraphs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();