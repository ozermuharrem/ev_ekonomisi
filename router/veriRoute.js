const express = require('express');
const veriController = require('../controller/veriController');
const authMiddleware = require('../middlewear/authMiddlewear');

const router = express.Router();

router.route('/veriGiris/add_giders').post(veriController.createGider);
//router.route('/').get(veriController.getAllGiders);
router.route('/').get(authMiddleware, veriController.getUserPage);
router.route('/veriGiris').get(veriController.getVeriGirisPage);



module.exports = router;