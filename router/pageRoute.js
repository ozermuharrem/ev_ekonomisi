const express = require('express');
const pageController = require('../controller/pageController');
const { route } = require('./giderRoute');

const router = express.Router();

router.route('/').get(pageController.getIndexPage); // ok
router.route('/login').get(pageController.getLoginPage);
router.route('/signup').get(pageController.getSignupPage);
// router.route('/evEkoMain').get(pageController.getEvEkoMainPage);

// route.route('/verigiris').get(pageController.getVerigirisPage)


module.exports = router