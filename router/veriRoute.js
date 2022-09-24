const express = require('express');
const veriController = require('../controller/veriController');

const router = express.Router();

router.route('/').post(veriController.createGider);
//router.route('/').get(veriController.getAllGiders);
router.route('/').get(veriController.getUserPage);


module.exports = router;