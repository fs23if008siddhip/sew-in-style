const port = 5000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { log } = require("console");
const Product = require('./models/products');
const { type } = require("os");
require("dotenv").config();
console.log('JWT_SECRET:', process.env.JWT_SECRET);

const orderRoutes = require("./routes/orders");
const authRoutes = require("./routes/auth");
const User =  require('./models/User')

app.use(express.json());
app.use(cors());

app.use("/api/orders", orderRoutes);
//Database Connection with MongoDB
mongoose.connect("mongodb+srv://patilsiddhi910_db_user:Siddhi%40008@cluster0.buutyv3.mongodb.net/Sew_in_Style")
app.use("/", authRoutes);



//API Creation
app.get("/",(req,res)=>{
    res.send("Express App is running")

})

//Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

// //Creating endpoint for registering the users
// app.post('/signup',async(req,res)=>{

//   let check = await Users.findOne({email:req.body.email});
//   if(check){
//     return res.status(400).json({success:false,errors:"existing user found with same email address"})
//   }
//   let cart = {};
//   for (let i= 0; i < 300; i++) {
//     cart[i]=0;
//   }
// const user = new Users({
//   name:req.body.username,
//   email:req.body.email,
//   password:req.body.password,
//   cartData:cart,

  
// })
// await user.save();

// const data = {
//   user:{
//     _id:user._id
//   }
// }

// const token = jwt.sign(data,'secret_ecom');
// res.json({success:true,token})

// })

// // creating endpoint for user  login
// app.post('/login',async (req,res)=>{
//    let user = await Users.findOne({email:req.body.email});
//    if (user){
//     const passCompare = req.body.password === user.password;
//     if(passCompare) {
//       const data = {
//         user:{
//           _id:user._id
//         }
//       }
//       const token = jwt.sign(data,'secret_ecom');
//       res.json({success:true,token});
//     }
//     else{
//       res.json({success:false,errors:"Wrong Password"});
//     }
//    }
//    else{
//     res.json({success:false,errors:"Wrong Email Address"})
//    }
// })

const upload = multer({storage:storage})

//Creating Upload endpoint for images
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})


//Add product
app.post('/addproduct', async (req, res) => {
  try {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
      let last_product = products[products.length - 1];
      id = last_product.id + 1;
    } else {
      id = 1;
    }

    const product = new Product({
      id: id,
      name: req.body.name,
     images:`http://localhost:5000/images/${req.file.filename}`, 
      price: Number(req.body.price),
      description:req.body.description,
      sizes:req.body.sizes,
    });

    console.log(product);
    await product.save();
    console.log("Saved");

    res.json({
      id: id.toString(),
      success: true,
      name: req.body.name,
    });
  } catch (err) {
    console.error("Error in /addproduct:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});


//Creating API for removing products

app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
    
})

//Creating API for getting all products
app.get('/allproducts',async (req,res)=>{
 let products = await Product.find({});
 console.log("ALL Products Fetched");
 res.send(products);
 
})


//creating endpoint for new collections products
app.get('/newcollections',async(req,res)=>{
  let products = await Product.find({});
  let newcollections = products.slice(1).slice(-8);
  console.log("NewCollection fetched");
  res.send(newcollections);

})

 //creating endpoint for popular products
 app.get('/popular',async(req,res)=>{
   let products = await Product.find({});
   let popular = products.slice(0,4);
   console.log("PopularCollection fetched");
   res.send(popular);

 })
 app.get('/test', (req, res) => {
  res.json({ success: true, message: "Test route works!" });
});




app.listen(port,(error)=>{
    if (!error){
        console.log("Server Running on Port " +port)
    }
    else{
        console.log("Error :"+error)
    }
})