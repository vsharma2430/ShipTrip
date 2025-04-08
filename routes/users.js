const express = require('express')
const router = express.Router()
const {api_ping,validateUser,get_user,add_user,update_user,delete_user} = require('../controllers/users')

router.route('/').get(api_ping).post(validateUser,add_user)
router.route('/:id').get(get_user).patch(validateUser,update_user).delete(delete_user)

module.exports = router