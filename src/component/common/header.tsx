import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { FaShopify } from 'react-icons/fa';
import { useCart } from '../../context/cart.context';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const {totalItems} = useCart();
  const navigate = useNavigate();
  return(
    
  <header className="header">
    <div className="logo-container" onClick={()=>{
      navigate('/')
    }}>
      <FaShopify className="logo-icon" />
      <h2 className="logo-text">Shopify</h2>
    </div>
    <nav className="nav-links">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/cart" className="nav-link">
      <span className='cartLength'>{totalItems}</span>
      <span>
      <FiShoppingCart className="cart-icon" />
      </span>
      
      </Link>
    </nav>
  </header>
  )
};

export default Header;
