const pool= require('../db/index.js')
const { v4: uuidv4 } = require('uuid');

delete_old_token = async(req,res,next)=>{
    const {username} = req.body
    const query = {
        text: "DELETE FROM auth_token WHERE username=$1 AND expires_at > CURRENT_TIMESTAMP + INTERVAL '1 week';",
        values: [username],
    };
    const result = await pool.query(query);
    next()
}

auth_user = async (req,res,next)=>{
    const {username,password} = req.body
    const query = {
        text: 'SELECT password FROM public.users WHERE username=$1;',
        values: [username],
    };
    const result = await pool.query(query);
    let saved_password = result.rows[0]
    
    if(saved_password.password === password)
    {
        next()
    }
    else
    {
        return res.status(403).json({success:false,data:'username or password is incorrect'})
    }
}

token_user = async (req,res) => {
    const {username} = req.body

    const query = {
        text: "select token, created_at, expires_at FROM public.auth_token where username=$1;",
        values: [username],
    };
    const result = await pool.query(query);
    let existing_token = result.rows[0];
    
    if(!existing_token)
    {
        let generated_token = uuidv4();
        const query = {
            text: "INSERT INTO public.auth_token (username, token, created_at, expires_at) VALUES($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '1 week' );",
            values: [username,generated_token],
        };
        const result = await pool.query(query);
        if(result)
            return res.status(200).json({success:true,data:{token:generated_token}})
        else
            return res.status(403).json({success:false,data:'login failed'})
    }
    else
    {
        return res.status(200).json({success:true,data:{...existing_token}})
    }
}

check_token = async (req,res,next) => {
    let auth_token = req.headers.authorization
    let {id}=req.params

    try{
        if(id)
            {
                const query = {
                    text: "select token, created_at, expires_at FROM public.auth_token where username=$1;",
                    values: [id],
                };
                const result = await pool.query(query);
                let existing_token = result.rows[0];
                
                if(existing_token.token === auth_token)
                {
                    console.log('Authorised token')
                    next()
                }
            }
    }
    catch(err)
    {
        console.log(err)
        return res.status(403).json({success:false, error: 'username or token is invalid'});
    }
}

module.exports = {delete_old_token,auth_user,token_user,check_token}
