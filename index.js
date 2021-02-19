const express = require('express');
const app = express();
const server = require('http').Server(app);

// extract style and scripts from sub pages into the layout
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

server.listen(process.env.PORT || 3000);
console.log("working fine");