const express = require('express');
const veriController = require('../controller/veriController');
const authMiddleware = require('../middlewear/authMiddlewear');
const vadeMiddleware = require('../middlewear/vadeMiddleware');


const router = express.Router();

router.route('/').get(authMiddleware, veriController.getUserPage);
router.route('/veriGiris').get(veriController.getVeriGirisPage);
router.route('/veriGiris/add_giders').post(veriController.createGider);
router.route('/veriGiris/add_gelirs').post(veriController.createGelir);
router.route('/downloadExcell/:slug').get(veriController.exportGider);
router.route('/:slug').get(veriController.getVeriDetay);
router.route('/:_id').delete(veriController.delete);
router.route('/:_id').put(veriController.update);




module.exports = router;