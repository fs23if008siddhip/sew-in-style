import React, { useState } from 'react';
import './CSS/Homecategory.css';
import { products } from '../Components/Assets/assets';
import Item from '../Components/Item/Item';
import shop_banner from '../Components/Assets/shop_banner.jpeg';

export const Homecategory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0); 
  };

  return (

    <div className="shop-category">
      <div className="shop-banner">
        <section id='shop'>
        <img src={shop_banner} alt="" />
        </section>
      </div>

      <div className="shopcategory-products">
        {currentProducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            description={item.description}
            image={item.image}
            price={item.price}
            category={item.category}
            sizes={item.sizes}
          />
        ))}
      </div>

      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Homecategory;
