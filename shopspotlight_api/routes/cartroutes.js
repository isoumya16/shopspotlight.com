const express = require('express');
const cartcontroller = require('../controllers/cartcontroller');

const router = express.Router();

router.post('/add', cartcontroller.addtocart);
router.get('/remove', cartcontroller.removefromcart);
router.delete('/get', cartcontroller.getcart);

module.exports = router;
