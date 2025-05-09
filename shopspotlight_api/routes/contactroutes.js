const express = require('express');
const contactcontroller = require('../controllers/contactcontroller');

const router = express.Router();

// Route to handle contact form submission
router.post('/', contactcontroller.submitcontactform);

module.exports = router;
