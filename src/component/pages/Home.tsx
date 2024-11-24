import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { useProductsQuery } from '../../Framework/product';
import { FaStar } from "react-icons/fa6";
import { useFetchCatgeory, useProductByCategory } from '../../Framework/category';

const Home: React.FC = () => {
  const { data: products, isLoading, isError, error } = useProductsQuery();
  const { data: category} = useFetchCatgeory();
  const [sortOrder, setSortOrder] = useState<string>(''); // For sorting
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // For filtering
  const {data: ProductByCategory} = useProductByCategory(selectedCategory)
 console.log(ProductByCategory ,"wdjhedh")
  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (isError) {
    return <p>Error: {error?.message || 'Something went wrong!'}</p>;
  }

  // Sort products based on the selected order
  const sortedProducts = [...(products || [])].sort((a: Product, b: Product) => {
    if (sortOrder === 'asc') {
      return a.price - b.price;
    } else if (sortOrder === 'desc') {
      return b.price - a.price;
    }
    return 0;
  });

  // Filter products based on the selected category
  const filteredProducts = selectedCategory
    ? sortedProducts.filter((product: Product) => product.category === selectedCategory)
    : sortedProducts;

 

  return (
    <div className="home-container">
      <div className='cart-header'>
      <h1 className="home-title">Product Listing</h1>

{/* Filters */}
<div className="filter-container">
  <div className="filter">
    <label htmlFor="sortOrder">Sort by Price:</label>
    <select
      id="sortOrder"
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
      className="dropdown"
    >
      <option value="">Select</option>
      <option value="asc">Low to High</option>
      <option value="desc">High to Low</option>
    </select>
  </div>

  <div className="filter">
    <label htmlFor="category">Filter by Category:</label>
    <select
      id="category"
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="dropdown"
    >
      <option value="">All Categories</option>
      {(category||[]).map((category: any) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  </div>
</div>
      </div>
     

      {/* Product Listing */}
      <div className="product-listing">
        {(filteredProducts || []).map((product: Product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <h4 className="product-name">{product.title}</h4>
            <div className="cart-header">
              <p className="product-price">₹{product.price}</p>
              <div>{product?.category}</div>
            </div>
            <div className="cart-header">
              <p>
                {product?.rating?.rate}
                <FaStar style={{ color: 'gold', marginLeft: '5px' }} />
              </p>
              <Link to={`/product-detail/${product.id}`} className="view-details-link">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
