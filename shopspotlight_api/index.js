const express = require('express');
const port = 5000;
const cors = require('cors');
const path = require("path");
const app = express();

app.use(express.json());
app.use(cors());

// const publicDirectory = path.join(__dirname, '../backend/public/img');
// app.use('/image', express.static('public/image'));

const publicDirectory = path.join(__dirname,'./public');

app.use(express.static(publicDirectory));

app.use('/users', require('./routes/userroutes'));
app.use('/categories', require('./routes/categoryroutes'));
app.use('/subcategories', require('./routes/subcategoryroutes'));
app.use('/products', require('./routes/productroutes'));
app.use('/cart', require('./routes/cartroutes'));

app.listen(process.env.PORT || 8080, (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log(`Server has started at ${port}`);
    }
})