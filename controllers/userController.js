const path = require('path');
// uuid for creating a unique id 
const { v4: uuidV4 } = require('uuid');
// create a new uuid and rediect to userEditor through router->controller
module.exports.userEditorCreate = function (req, res) {

    return res.redirect(`/users/${uuidV4()}`);

}
// joining a created unique room
module.exports.userEditor = function (req, res) {

    return res.render('user-editor', {
        title: "user editor",
        roomId: req.params.room,
    });


}
