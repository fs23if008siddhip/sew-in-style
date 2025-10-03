import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import Breadcrums from '../Components/Breadcrums/Breadcrums';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products } = useContext(ShopContext);

  const product = products.find((p) => p.id === (productId));

  return (
    <div>
      {product && <Breadcrums product={product} />}
      <ProductDisplay product={product}/>
      <DescriptionBox/>
      <RelatedProducts/>

    </div>
  );
};

export default Product;
