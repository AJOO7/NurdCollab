const path = require('path');
// rendering homepage
module.exports.home = function (req, res) {

    return res.render('index', {
        title: "user editor",
    });

}