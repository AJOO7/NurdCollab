const express = require('express');
const app = express();
const server = require('http').Server(app);


server.listen(process.env.PORT || 3000);