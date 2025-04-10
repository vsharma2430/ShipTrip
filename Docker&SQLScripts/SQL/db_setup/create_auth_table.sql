CREATE TABLE auth_token (
    token_id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    token VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    CONSTRAINT fk_username
        FOREIGN KEY (username)
        REFERENCES users(username)
        ON DELETE CASCADE
);