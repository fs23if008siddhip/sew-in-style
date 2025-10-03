import React, { useState } from 'react'
import './AddProduct.css'
import upload_icon from '../../assets/upload_image.png'
const AddProduct = () => {
    const [image,setImage] = useState(false);
    const[productDetails,setProductDetails] = useState({
            name:"",
            price:"",
            description:"",
            image:"",
    })
    const [selectedSizes, setSelectedSizes] = useState({
  S: { checked: false, stock: 0 },
  M: { checked: false, stock: 0 },
  L: { checked: false, stock: 0 },
  XL: { checked: false, stock: 0 },
});


    const imageHandler = (e) =>{
setImage(e.target.files[0]);
    }
    const changeHandler = (e) =>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }

    const Add_Product = async()=>{
        console.log(productDetails);
        let responseData;
const filteredSizes = Object.entries(selectedSizes)
  .filter(([size, data]) => data.checked)
  .map(([size, data]) => ({
    size,
    stock: data.stock
  }));

let product = {
  ...productDetails,
  sizes: filteredSizes
};


        let formData = new FormData();
        formData.append('product',image);

        await fetch('http://localhost:5000/upload',{
            method:'POST',
            headers:{
                Accept:'application/json'
            },body:formData,
        }).then((resp) =>resp.json()).then((data)=>{responseData=data})
        if(responseData.success){
            product.image = responseData.image_url;
            console.log(product);
            await fetch('http://localhost:5000/addproduct',{
  method: 'POST',
  headers: { 
    'Accept':'application/json',
    'Content-Type':'application/json',
  },
  body: JSON.stringify(product),
})
.then(resp => resp.json())
.then(data => {
  data.success ? alert("Product Added") : alert("Failed");
});

        }
        
    }
  return (
    <div className='addproduct'>
        <div className="addproduct-itemfield">
            <p>Product Title</p>
            <input  onChange={changeHandler} type="text"  name='name' placeholder='Type here'/>
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Price</p>
                <input  onChange={changeHandler} type="text" name="price" placeholder='Type Here' />
            </div>
        </div>

       <div className="product-sizes-section">
  <h3>Available Sizes</h3>
  
  {["S", "M", "L", "XL"].map((size) => (
    <div key={size} className="size-option">
      <label>
        <input type="checkbox" checked={selectedSizes[size]?.checked || false}
          onChange={(e) => {
            setSelectedSizes((prev) => ({
              ...prev,
              [size]: {
                checked: e.target.checked,
                stock: e.target.checked ? (prev[size]?.stock || 0) : 0
              }
            }));
          }}
        />
        {size}
      </label>
      {selectedSizes[size]?.checked && (
        <input
          type="number"
          min="0"
          placeholder="Stock"
          value={selectedSizes[size].stock}
          onChange={(e) =>
            setSelectedSizes((prev) => ({
              ...prev,
              [size]: { ...prev[size], stock: e.target.value }
            }))
          }
          className="stock-input"
        />
      )}
    </div>
  ))}
</div>

        <div className='addproduct-description'>
            <div className='addproduct-itemfield'>
            <p>Description</p>
            <input  onChange={changeHandler} type="text" name='description' placeholder='Type Here' />
            </div>
        </div>

        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload_icon} className='addproduct-thumbnail-img' alt="" />
            </label>
            <input  onChange={imageHandler} type="file" name='image' id='file-input' hidden />
            <p>Add Image</p>
        </div>
        <button onClick={()=>{Add_Product()}}className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct