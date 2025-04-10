INSERT INTO public.auth_token
(username, "token", created_at, expires_at)
VALUES('vs2430', 'first_token_alright2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '1 week' );