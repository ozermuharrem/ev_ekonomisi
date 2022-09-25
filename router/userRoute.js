const express   = require('express');

const userController = require('../controller/userController');

const router = express.Router();

router.route('/signup').post(userController.createUser); //ok
router.route('/login').post(userController.loginUser);
router.route('/logout').get(userController.logOutUser);



module.exports = router;