import React, { createContext, useEffect, useState } from "react";
export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/allproducts"); 
      const data = await response.json();


      const productsWithStringIds = data.map((p) => ({
        ...p,
        id: p.id?.toString() || p._id?.toString(),
      }));

      setProducts(productsWithStringIds);


      let cart = {};
      productsWithStringIds.forEach((item) => {
        cart[item.id] = 0;
      });
      setCartItems(cart);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product.id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
  getTotalCartItems,
  getTotalCartAmount,
  products,
  cartItems,
  addToCart,
  removeFromCart,
  loading,
  fetchProducts 
};


  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
