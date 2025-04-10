-- Create an index for faster lookups
CREATE INDEX idx_auth_token_username ON auth_token(username);
