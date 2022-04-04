const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get("/",productController.getAll);

router.put("/rate/:id",productController.review);

//router.post("/create",productController.createOne);

module.exports = router;