const express = require('express')
const router = express.Router()
const { Catagory } = require('../models/EcommerseModel');

router.post('/addCatagories', async (req, res) => {
    const { catagory_name } = req.body;
    try {

        const addCatagory_name = new Catagory({ catagory_name: catagory_name });
        await addCatagory_name.save();

        if (addCatagory_name) {
            res.send(addCatagory_name);
        }
    } catch (error) {
        res.send({ message: "eror occure" })
    }
})

router.post('/subcatagories', async (req, res) => {
    const { subCatagory_name, catagory_id } = req.body;


    const findCatagory = await Catagory.findOne({ _id: catagory_id });

    try {

        const addCatagory_name = await findCatagory.addSubCatagoryName(subCatagory_name)

        if (addCatagory_name) {
            res.send(addCatagory_name);
        }
    } catch (error) {
        res.send({ message: "eror occure" })
    }
})

router.post('/addChildCategories', async (req, res) => {
    const { type_name, category_id, subCat_id } = req.body;

    const childSubCategories = await Catagory.updateOne(
        { subCatagory: { $elemMatch: { _id: category_id } } },
        { $push: { "subCatagory.$.child_subCatagory": { type_name: type_name } } }
    );

    if (childSubCategories) {
        res.send(childSubCategories)
    }
})

module.exports = router