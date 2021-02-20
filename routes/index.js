// Following MVC pattern
// homecontroller control rendering for home page
const homecontroller = require('../controllers/homeController');
const express = require('express');
const router = express.Router();
// calling home component of home controllers for home page
router.get('/', homecontroller.home);
// redirecting to user router for user creating and joinig
router.use('/users', require('./users'));
module.exports = router;
