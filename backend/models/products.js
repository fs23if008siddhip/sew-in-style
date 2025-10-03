const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description:{
    type:String,
    required: true,
  },
  sizes: [
  {
    size: { type: String, required: true },   
    stock: { type: Number, default: 0 } ,
  }
],

  date:{
        type:Date,
        default:Date.now,
     },
     available:{
         type:Boolean,
         default:true,
     },
     

});

// ✅ Prevent OverwriteModelError
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

module.exports = Product;
