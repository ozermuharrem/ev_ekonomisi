const express = require('express');
const veriController = require('../controller/veriController');

const router = express.Router();

router.route('/verigiris/add_giders').post(veriController.createGider);
//router.route('/').get(veriController.getAllGiders);
router.route('/').get(veriController.getUserPage);
router.route('/verigiris').get(veriController.getVeriGirisPage);



module.exports = router;