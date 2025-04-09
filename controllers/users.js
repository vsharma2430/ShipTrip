const {pool,executeTransaction}= require('../db/index.js')
const {userSchema} = require('./schema.js')
const {select_all_users} = require('./sql.js')

api_ping = async (req,res)=>{
    let result = await pool.query(select_all_users)
    return res.status(200).json({success:true,data:result.rows})
}

get_user = async(req,res)=>{
    let {id}=req.params
    if(id)
    {
        try
        {
            const query = {
                text: 'SELECT id, email, first_name, last_name, date_of_birth, bio, created_at, updated_at, is_active, last_login FROM public.users WHERE username = $1',
                values: [id],
            };
    
            const result = await executeTransaction(async (client) => {
                return client.query(query);
            });

            if(result.rows.length>0)
                return res.status(200).json({success:true,data:result.rows});
            else
                return res.status(404).json({success:true,data:result.rows});
        }
        catch(err)
        {
            return res.status(400).json({success:false,data:err});
        }
    }
    else
    {
        return res.status(400).json({success:false,data:{}})
    }
}

validateUser = (req, res, next) => {
    const { error, value } = userSchema
            .validate(req.body.username ? req.body : {...req.body,username:req.params.id} ,
                {abortEarly: false, stripUnknown: true});

    if (error) {
        // Format the error response
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errorMessages
        });
    }

    // Attach validated data to request object
    req.validatedUser = value;
    next();
};

add_user = async (req,res)=>{
    const {email,username,password,first_name,last_name,date_of_birth,bio} = req.body

    if(username && password && email && first_name)
    {
        try
        {
            const query = {
                text: "INSERT INTO public.users (username, email, password, first_name, last_name, date_of_birth, bio, created_at, updated_at, is_active, last_login) VALUES($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, CURRENT_TIMESTAMP);",
                values: [username,email,password,first_name,last_name,date_of_birth,bio],
            };
    
            const result = await executeTransaction(async (client) => {
                return client.query(query);
            });
            return res.status(200).json({success:true,data:result.rows});
        }
        catch(err)
        {
            return res.status(400).json({success:false,data:err});
        }
    }
    return res.status(406).json({success:false,data:[]});
}

update_user = async (req,res)=>{
    let {id}=req.params
    const {email,password,first_name,last_name,date_of_birth,bio} = req.body

    if(id)
    {
        try
        {
            const query = {
                text: "UPDATE public.users SET email=$1, password=$2, first_name=$3, last_name=$4, date_of_birth=$5, bio=$6, updated_at=CURRENT_TIMESTAMP WHERE username=$7;",
                values: [email,password,first_name,last_name,date_of_birth,bio,id],
            };
    
            const result = await executeTransaction(async (client) => {
                return client.query(query);
            });
            return res.status(200).json({success:true,data:result.rows});
        }
        catch(err)
        {
            return res.status(400).json({success:false,data:err});
        }
    }
    return res.status(406).json({success:false,data:[]});
}

delete_user = async (req,res)=>{
    let {id}=req.params
    if(id)
    {
        try
        {
            const query = {
                text: 'DELETE FROM public.users WHERE username= $1',
                values: [id],
            };
    
            const result = await executeTransaction(async (client) => {
                return client.query(query);
            });
            return res.status(200).json({success:true,data:'User deleted'});
        }
        catch(err)
        {
            return res.status(400).json({success:false,data:err});
        }
    }
    else
    {
        return res.status(400).json({success:false,data:{}})
    }
}

module.exports = {api_ping,validateUser,get_user,add_user,update_user,delete_user}