const express = require("express");
const productsController = require("../../controllers/products-controller");

const router = express.Router();

router.get("/", productsController.get);
router.get("/:id", productsController.getById);

module.exports = router;
