const path = require('path');
const { v4: uuidV4 } = require('uuid');

module.exports.userEditorCreate = function (req, res) {

    return res.redirect(`/users/${uuidV4()}`);

}
module.exports.userEditor = function (req, res) {

    return res.render('user-editor', {
        title: "user editor",
        roomId: req.params.room,
    });


}
