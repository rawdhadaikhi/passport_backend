const express = require('express');
const { register, login } = require('../controllers/userController');
const { registerRules, validator, loginRules } = require('../middlewares/validator');
const Router = express.Router();
const isAuth = require('../middlewares/passport-setup');

// first route : register user
Router.post('/register', registerRules(),validator,register)
// router login :
Router.post('/login',loginRules(),login)
Router.get('/current',isAuth(),(req,res) => res.json(req.user));

module.exports = Router;