const express = require('express')
const router = express.Router()
const {api_ping,validateUser,get_user,add_user,update_user,delete_user} = require('../controllers/users')
const {check_token} = require('../controllers/auth')

router.route('/').get(api_ping).post(validateUser,add_user)

//router.use('/:id',)
router.route('/:id').get(get_user).patch(check_token,validateUser,update_user).delete(delete_user)

module.exports = router