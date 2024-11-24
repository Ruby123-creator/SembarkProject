import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import { useProductsQuery } from '../../Framework/product';
import { useNavigate } from 'react-router-dom';


const Home: React.FC = () => {
  const { data: products, isLoading, isError, error } = useProductsQuery();

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (isError) {
    return <p>Error: {error?.message || 'Something went wrong!'}</p>;
  }

  return (
    <div>
      <h1>Product Listing</h1>
      <div className='productListing'>
        {(products||[]).map((product: Product) => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '1rem', width: '200px' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%' }} />
            <h3>{product.name}</h3>
            <p> ₹{product.price}</p>
            <Link to={`/product-detail/${product.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
