CREATE TABLE change_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hypothesis_id INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    content TEXT NOT NULL,
    change_type INTEGER NOT NULL,  -- 0=context, 1=hypothesis
    reason TEXT,
    timestamp datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (hypothesis_id) REFERENCES hypotheses(id)
);

-- Optional: Add indexes for better query performance
CREATE INDEX idx_change_logs_hypothesis_id ON change_logs(hypothesis_id);
CREATE INDEX idx_change_logs_user_id ON change_logs(user_id);
CREATE INDEX idx_change_logs_timestamp ON change_logs(timestamp);