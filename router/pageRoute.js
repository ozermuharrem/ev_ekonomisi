const express = require('express');
const pageController = require('../controller/pageController');

const router = express.Router();

router.route('/').get(pageController.getIndexPage);
router.route('/login').get(pageController.getLoginPage);
router.route('/signup').get(pageController.getSignupPage);



module.exports = router