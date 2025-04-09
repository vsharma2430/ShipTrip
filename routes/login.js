const express = require('express')
const router = express.Router()
const {delete_old_token,auth_user,token_user} = require('../controllers/auth')

router.route('/').post(delete_old_token,auth_user,token_user)

module.exports = router