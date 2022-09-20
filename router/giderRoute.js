const express = require('express');
const giderController = require('../controller/giderController');

const router = express.Router();

router.route('/').post(giderController.createGider);
router.route('/').get(giderController.getAllGiders);



module.exports = router;