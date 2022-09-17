const express = require('express');
const kategoriController = require('../controller/kategoriController');

const router = express.Router();

router.route('/').post(kategoriController.createKategori);

module.exports = router;

