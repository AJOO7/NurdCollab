const express = require('express');
const app = express();
const server = require('http').Server(app);
// initialising peerjs server
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
    debug: true,
});
app.use("/peerjs", peerServer);

// extract style and scripts from sub pages into the layout
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// sockets config
const editorSockets = require('./config/editor_sockets').editorSockets(server);
// css js images
app.use(express.static('assets'))

const path = require('path');
// following MVC pattern
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/', require('./routes'));

server.listen(process.env.PORT || 3000);
// console.log("working fine");