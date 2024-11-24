import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './component/common/layout';
import Home from './component/pages/Home';
import ProductDetails from './component/pages/product-detail';
import Cart from './component/pages/cart';
import './App.css'
const App: React.FC = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-detail/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Layout>
  </Router>
);

export default App;
