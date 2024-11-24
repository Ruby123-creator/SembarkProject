import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Product } from '../types/Product';
import { API_ENDPOINTS } from './utils/api-endpoints';

// Function to fetch products
const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(API_ENDPOINTS.GET_PRODUCT);
  return response.data;
};

// React Query Hook
export const useProductsQuery = () => {
  return useQuery({
    queryKey: ['products'], // Query Key
    queryFn: fetchProducts, // Query Function
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 3,                 // Retry 3 times on failure
    refetchOnWindowFocus: false, // Disable auto-refetch on window focus
  });
};



// Fetch Product by ID
const fetchProductById = async (id: number): Promise<Product> => {
    const response = await axios.get<Product>(`${API_ENDPOINTS.GET_PRODUCT}/${id}`);
    return response.data;
  };
  
  // React Query Hook
  export const useProductById = (id: number) => {
    return useQuery({
      queryKey: ['product-detail', id], // Include `id` for query uniqueness
      queryFn: () => fetchProductById(id), // Fetch function
      staleTime: 1000 * 60 * 5, // Cache for 5 minutes
      retry: 3,                 // Retry on failure
      refetchOnWindowFocus: false, // No auto-refetch on focus
    });
  };
