const express = require('express');
const usercontroller = require('../controllers/usercontroller');
const productcontroller = require('../controllers/productcontroller');

const router = express.Router();

router.post('/registration', productcontroller.upload.single('image'), usercontroller.registration);
router.post('/login', usercontroller.login);
router.get('/userlist', usercontroller.userlist);
router.delete('/deleteuser/:id', usercontroller.deleteuser);
router.put('/updateuser/:id', productcontroller.upload.single('image'), usercontroller.updateuser);
router.get('/singleuserlist/:id', usercontroller.singleuserlist);

module.exports = router;
