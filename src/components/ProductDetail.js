import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductDetail.css'; 

const ProductDetail = ({ match }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`/v1/products/${match.params.id}`);
      setProduct(response.data);
    };

    fetchProduct();
  }, [match.params.id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail">
      <div className="product-image">
        <img src={product.image_url} alt={product.Name} />
      </div>
      <div className="product-info">
        <h1>{product.Name}</h1>
        <p>{product.description}</p>
        <h2>{product.price}₫</h2>
        <button className="buy-now">Mua ngay</button>
      </div>
    </div>
  );
};

export default ProductDetail;
