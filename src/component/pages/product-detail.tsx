import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductById } from '../../Framework/product';
import { useCart } from '../../context/cart.context';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // `id` is extracted from the route parameters
  const productId = Number(id); // Ensure `id` is converted to a number
  const [quantity, setQuantity] = useState(1); // Quantity state
  const { data: product, isLoading, isError, error } = useProductById(productId); // Use custom hook to fetch product
  const {items=[] ,addItemToCart ,removeItemFromCart} = useCart();
  // Handle loading state
  if (isLoading) {
    return <p>Loading product details...</p>;
  }

  // Handle error state
  if (isError) {
    return <p>Error: {error?.message || 'Failed to load product details'}</p>;
  }
  const handleIncrement =()=>{
    addItemToCart({...product as any}, 1);
  }
  const handleDecrement =()=>{
    removeItemFromCart(product?.id as any);
  }
  // Handle case where product is not found
  if (!product) {
    return <p>Product not found</p>;
  }
 
  // Render product details
  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} style={{ width: '300px' }} />
      <p>{product.description}</p>
      <p>Price: ₹{product.price}</p>
      <div style={{ marginTop: '20px' }}>
        {!(items?.length) ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => handleDecrement()}
              style={{
                padding: '10px',
                backgroundColor: '#FF3B30',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              -
            </button>
            {/* <span>{cartItem.quantity}</span> */}
            <button
              onClick={() => handleIncrement()}
              style={{
                padding: '10px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleIncrement()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007BFF',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Add to Cart
          </button>
        )}
      </div>
      <div style={{ marginTop: '40px' }}>
        <h2>Cart Summary</h2>
        {items.length > 0 ? (
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {item.name} - ₹{item.price} x {item.quantity} = ₹{item.price *1}
              </li>
            ))}
          </ul>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
