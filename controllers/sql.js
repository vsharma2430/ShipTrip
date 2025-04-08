select_all_users = `SELECT id, username, email, first_name, last_name, date_of_birth, bio, created_at, updated_at, is_active, last_login FROM public.users;`
module.exports = {select_all_users}