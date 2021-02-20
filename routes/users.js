// Following MVC pattern
// usercontroller control renderig for editor page
const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();
// using userEditorCreate for providing a new uuid for the editor page
router.get('/', userController.userEditorCreate);
// using userEditor for joining a previously created room id
router.get('/:room', userController.userEditor);
module.exports = router;
