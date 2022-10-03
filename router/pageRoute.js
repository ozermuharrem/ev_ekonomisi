const express = require('express');
const pageController = require('../controller/pageController');
const redirectMiddleware = require('../middlewear/redircktMiddleware')
const { route } = require('./veriRoute');

const router = express.Router();

router.route('/').get(pageController.getIndexPage); // !ok
router.route('/login').get(redirectMiddleware, pageController.getLoginPage);
router.route('/signup').get(redirectMiddleware, pageController.getSignupPage);


// router.route('/evEkoMain').get(pageController.getEvEkoMainPage);

// route.route('/verigiris').get(pageController.getVerigirisPage)


module.exports = router