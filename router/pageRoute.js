const express = require('express');
const pageController = require('../controller/pageController');
const redirectMiddleware = require('../middlewear/redircktMiddleware')

const router = express.Router();

router.route('/').get(pageController.getIndexPage); // !ok
router.route('/login').get(redirectMiddleware, pageController.getLoginPage);
router.route('/signup').get(redirectMiddleware, pageController.getSignupPage);

module.exports = router