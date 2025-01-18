CREATE TABLE purchases (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL,
      document_id INTEGER NOT NULL,
      checkout_session_id TEXT NOT NULL UNIQUE,
      status INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE,
      FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
);

-- Index for foreign keys to improve query performance
CREATE INDEX idx_payments_document_id ON purchases(document_id);
CREATE INDEX idx_payments_email ON purchases(email);