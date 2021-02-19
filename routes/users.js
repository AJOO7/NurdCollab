const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();
router.get('/', userController.userEditorCreate);
router.get('/:room', userController.userEditor);
module.exports = router;
