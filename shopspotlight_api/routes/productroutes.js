const express = require('express');
const productcontroller = require('../controllers/productcontroller');

const router = express.Router();

router.post('/addproduct', productcontroller.upload.single('productImage'), productcontroller.addproduct);
router.delete('/deleteproduct/:id', productcontroller.deleteproduct);
router.put('/updateproduct/:id',productcontroller.upload.single('productImage'),productcontroller.updateproduct);
router.get('/productlist', productcontroller.productlist);
router.get('/singleproductlist/:id', productcontroller.singleproductlist);
router.get('/productcount', productcontroller.getproductcount);
router.get('/topproducts', productcontroller.gettopproducts);
router.get('/banners', productcontroller.getbanners);
router.put('/like/:id', productcontroller.updatelikecount);
router.get('/likes/:id', productcontroller.getlikecount);
router.put('/view/:id', productcontroller.updateviewcount);
router.get('/searchproduct', productcontroller.searchproduct);

module.exports = router;
