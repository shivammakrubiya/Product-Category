const mongoose = require("mongoose");

const catagorySchema = new mongoose.Schema({
  catagory_name: {
    type: String,
  },
  subCatagory: [
    {
      subCatagory_name: {
        type: String,
      },
      child_subCatagory: [
        {
          type_name: {
            type: String,
          },
        },
      ],
    },
  ],
});


const productSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true
  },
  product_price: {
    type: Number,
    required: true
  },
  category_id:
  {

    type: mongoose.Schema.Types.ObjectId,
    ref: 'catagory'
  }

})


catagorySchema.methods.addSubCatagoryName = async function (subCatagory_name) {
  try {
    this.subCatagory = this.subCatagory.concat({
      subCatagory_name: subCatagory_name,
    });
    await this.save();
    return this.subCatagory;
  } catch (error) {
    console.log(error);
  }
};

catagorySchema.methods.addChildSubcatagory = async function (type_name) {
  console.log("hello world");
  try {
    this.child_subCatagory = this.child_subCatagory.concat({ type_name: type_name });
    await this.save();
    return this.child_subCatagory;
  } catch (error) {
    console.log(error)
  }
}

productSchema.methods.addCategoryId = async function (categoryId) {
  try {
    this.category_id = this.category_id.concat(categoryId)
    await this.save();
    return this.category_id;

  } catch (error) {
    console.log(error);
  }
}

const Catagory = mongoose.model("catagory", catagorySchema);
const Product = mongoose.model('product', productSchema)

module.exports = { Catagory, Product };
