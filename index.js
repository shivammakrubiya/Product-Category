const db = require('./db/db');
const express = require('express');
const app = express();
const CategoryRoutes = require('./routes/category.router')
const ProductRoutes = require('./routes/product.router')

app.use(express.json())

app.use('/category', CategoryRoutes)
app.use('/product', ProductRoutes)

app.listen(8000, () => {
    console.log("Listening to the port 8000");
})