const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller')
const userController = new UserController();

/* GET users listing. */
router.post('/signup', userController.user_signup)
router.post('/login', userController.user_login)    

module.exports = router;
