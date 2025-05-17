const express = require('express');
const subcategorycontroller = require('../controllers/subcategorycontroller');
const productcontroller = require('../controllers/productcontroller');

const router = express.Router();

router.post('/addsubcategory', productcontroller.upload.single('productImage'), subcategorycontroller.addsubcategory);
router.delete('/deletesubcategory/:id', subcategorycontroller.deletesubcategory);
router.put('/updatesubcategory/:id',productcontroller.upload.single('productImage'),subcategorycontroller.updatesubcategory);
router.get('/subcategorylist', subcategorycontroller.subcategorylist);
router.get('/singlesubcategorylist/:id', subcategorycontroller.singlesubcategorylist);
router.get('/subcategoryforcategory/:id', subcategorycontroller.subcategoryforcategory);

module.exports = router;
