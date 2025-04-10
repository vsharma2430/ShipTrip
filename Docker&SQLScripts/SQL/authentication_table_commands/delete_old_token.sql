DELETE FROM auth_token
WHERE username='vs2430' AND expires_at > CURRENT_TIMESTAMP + INTERVAL '1 week';