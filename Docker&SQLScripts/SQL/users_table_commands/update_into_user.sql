UPDATE public.users
SET email='', "password"='', first_name='', last_name='', date_of_birth='', bio='', updated_at=CURRENT_TIMESTAMP, is_active=true, last_login=''
WHERE username='';