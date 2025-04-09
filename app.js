const express = require('express')
const app = express()
const port = 5000
const users = require('./routes/users')
const login = require('./routes/login')
const pool = require('./db/index')
const morgan = require('morgan')

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(morgan('short'))

//route- db check
app.get('/',async (req,res)=>{
    let result = await pool.query('SELECT now()')
    return res.json({success:true,db_now:result.rows})
})

//route- users
app.use('/api/v1/users',users)
app.use('/api/v1/login',login)

app.listen(port,console.log(`Listening on port ${port}`))