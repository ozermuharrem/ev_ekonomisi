const express = require('express');
const giderController = require('../controller/giderController');

const router = express.Router();

router.route('/').post(giderController.createGider);


module.exports = router;