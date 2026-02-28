const express = require('express');
const router = express.Router();

const {convertCurrency} = require("../controllers/currency.controller");

router.get("/convert", convertCurrency)

module.exports = router