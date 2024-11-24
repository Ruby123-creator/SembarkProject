import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductById } from '../../Framework/product';
import { useCart } from '../../context/cart.context';


const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const { data: product, isLoading, isError, error } = useProductById(productId);
  const { items = [], addItemToCart, removeItemFromCart, isInCart, getItemFromCart } = useCart();

  if (isLoading) {
    return <p>Loading product details...</p>;
  }

  if (isError) {
    return <p>Error: {error?.message || 'Failed to load product details'}</p>;
  }

  const handleIncrement = () => {
    addItemToCart({ ...(product as any) }, 1);
  };

  const handleDecrement = () => {
    removeItemFromCart(product?.id as any);
  };

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="product-details-container">
      <div className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" />
      </div>
      <div className="product-info-container">
        <h1 className="product-title">{product.title}</h1>
        <p className="product-description">{product.description}</p>
        <p className="product-price">Price: ₹{product.price}</p>

       
        <div className="product-actions">
          {isInCart(product?.id) ? (
            <div className="quantity-controls">
              <button onClick={handleDecrement} className="quantity-button decrement">
                -
              </button>
              <span className="quantity">
                {getItemFromCart(Number(product.id))?.quantity}
              </span>
              <button onClick={handleIncrement} className="quantity-button increment">
                +
              </button>
            </div>
          ) : (
            <button onClick={handleIncrement} className="add-to-cart-button">
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
