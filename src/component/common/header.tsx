import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => (
  <header style={{ padding: '1rem', background: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
    <nav>
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
      <Link to="/cart">Cart</Link>
    </nav>
  </header>
);

export default Header;
