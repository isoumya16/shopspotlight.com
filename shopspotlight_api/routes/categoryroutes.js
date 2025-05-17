const express = require('express');
const categorycontroller = require('../controllers/categorycontroller');
const productcontroller = require('../controllers/productcontroller');

const router = express.Router();

router.post('/addcategory', productcontroller.upload.single('productImage'), categorycontroller.addcategory);
router.delete('/deletecategory/:id', categorycontroller.deletecategory);
router.put('/updatecategory/:id',productcontroller.upload.single('productImage'),categorycontroller.updatecategory);
router.get('/categorylist', categorycontroller.categorylist);
router.get('/singlecategorylist/:id', categorycontroller.singlecategorylist);

module.exports = router;
