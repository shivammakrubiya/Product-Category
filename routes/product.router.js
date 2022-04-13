
const express = require('express')
const router = express.Router()
const { Product } = require('../models/EcommerseModel');

router.post('/addProduct', async (req, res) => {
    const {
        product_name,
        product_price,
        category_id
    } = req.body
    try {

        const addProduct = new Product(
            {
                product_name: product_name,
                product_price: product_price,
                category_id: category_id
            });
        await addProduct.save();

        if (addProduct) {
            res.send(addProduct)
        }

    } catch (error) {
        console.log("error occurs");
    }

})

router.get('/', async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                '$lookup': {
                    'from': 'catagories',
                    'localField': 'category_id',
                    'foreignField': '_id',
                    'as': 'category'
                },
           

            },{
                "$unwind": '$category'
            }
        ])
        if (products) {
            res.status(200).send({ data: products })
        }

    } catch (error) {
        console.log(error);
        res.send({ error: "error occurs" })
    }

})


router.get('/:id', async (req, res) => {
    const id = req.params.id;


    try {
        const products = await Product.findById(
            {_id : id},
        //     [
        //     {
        //         '$lookup': {
        //             'from': 'catagories',
        //             'localField': 'category_id',
        //             'foreignField': '_id',
        //             'as': 'category'
        //         },
           

        //     },{
        //         "$unwind": '$category'
        //     }
        // ]
        )
        if (products) {
            res.status(200).send({ data: products })
        }

    } catch (error) {
        console.log(error);
        res.send({ error: "error occurs" })
    }

})

module.exports = router