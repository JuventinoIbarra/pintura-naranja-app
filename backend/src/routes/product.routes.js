const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");

router.get("/", productController.getProducts);

router.put("/:id/stock", productController.updateStock)

module.exports = router;
