const homecontroller = require('../controllers/homeController');
const express = require('express');
const router = express.Router();
router.get('/', homecontroller.home);
router.use('/users', require('./users'));
module.exports = router;
