const express = require('express');
const cardRouter = express.Router();
const userdtls = require('../controller/user-controller');


// POST request handler for /api/card
cardRouter.post('/cards', userdtls);


module.exports = cardRouter;
