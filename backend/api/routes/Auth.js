const express = require('express')
const passport = require('passport')
const authController = require('../controllers/Auth')
const catchAsync = require('../utils/catchAsync')
const { isLoggedIn } = require('../../middleware')
const router = express.Router();

router.route('/auth/google')
    .get(passport.authenticate('google', { scope: ['profile'] }), authController.login)

router.route('/callback')
    .get(passport.authenticate('google'), authController.callback)

router.route('/auth/logout')
    .get(authController.logout)

router.route('/user')
    .get(isLoggdIn, catchAsync(authController.getUser))