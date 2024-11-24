import React from 'react';
import { useCart } from '../../context/cart.context';
import { FaShoppingCart } from 'react-icons/fa'; 


const CartPage: React.FC = () => {
  const { items, totalItems, total, removeItemFromCart, addItemToCart, resetCart } = useCart();
  console.log(items,"jhdjh")
  const handleIncrement = (id: string | number) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      addItemToCart(item, 1);
    }
  };

  const handleRemove = (id: string | number) => {
    removeItemFromCart(id);
  };

  return (
    <div className="cart-page-container">
      <div className='cart-header'>
      <h1 className="cart-page-title">
        <FaShoppingCart className="cart-icon" /> Your Cart
      </h1>
      <button onClick={() => resetCart()} className="remove-item-btn">
                  Remove
                </button>
      </div>
     
      {items.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div>
                <img src={item.image} alt={item.title} className="cart-image" />
                </div>
                <div className="cart-item-details">
                  <span className="">{item.title}</span>
                  <span className="cart-item-price">Price: ₹{item.price}</span>
                </div>
                 
                <div className="cart-item-actions">
                  <button onClick={() => handleRemove(item.id)} className="decrement-btn">
                    -
                  </button>
                  <span className="cart-item-quantity">{item.quantity}</span>
                  <button onClick={() => handleIncrement(item.id)} className="increment-btn">
                    +
                  </button>
                </div>

                
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-total-items">Total Items: {totalItems}</div>
            <div className="cart-total-price">Total Price: ₹{total}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
