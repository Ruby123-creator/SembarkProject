import React from 'react';
import { useCart } from '../../context/cart.context';// Import the useCart hook

const CartPage: React.FC = () => {
  const { items, totalItems, total, removeItemFromCart, addItemToCart } = useCart();

  // Handle increment of quantity
  const handleIncrement = (id: string | number) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      addItemToCart(item, 1); // Increment the quantity by 1
    }
  };

  // Handle decrement of quantity
  const handleDecrement = (id: string | number) => {
    const item = items.find((item) => item.id === id);
    if (item && item.quantity! > 1) {
      addItemToCart(item, -1); // Decrement the quantity by 1
    } else {
      removeItemFromCart(id); // Remove the item if quantity is 1
    }
  };

  // Handle remove item from cart
  const handleRemove = (id: string | number) => {
    removeItemFromCart(id);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1>Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div>
            {items.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span>{item.name}</span>
                  <span>Price: ₹{item.price}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <button
                    onClick={() => handleRemove(item.id)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#FF3B30',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      marginRight: '10px',
                    }}
                  >
                    -
                  </button>
                  <span style={{ fontSize: '18px', marginRight: '10px' }}>{item.quantity}</span>
                  <button
                    onClick={() => handleIncrement(item.id)}
                    style={{
                      padding: '8px 16px',
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

                <button
                  onClick={() => handleRemove(item.id)}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#FF5722',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginLeft: '20px',
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
            <div>Total Items: {totalItems}</div>
            <div>Total Price: ₹{total}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
