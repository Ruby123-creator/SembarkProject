import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Product } from '../types/Product';
import { API_ENDPOINTS } from './utils/api-endpoints';


const fetchCategory = async (): Promise<String[]> => {
  const response = await axios.get<String[]>(API_ENDPOINTS.GET_CATEGORY);
  return response.data;
};


export const useFetchCatgeory = () => {
  return useQuery({
    queryKey: ['category'], // Query Key
    queryFn: fetchCategory, // Query Function
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 3,                 // Retry 3 times on failure
    refetchOnWindowFocus: false, // Disable auto-refetch on window focus
  });
};



// Fetch Product by ID
const fetchProductByCategory = async (category: String): Promise<Product> => {
    const response = await axios.get<Product>(`${API_ENDPOINTS.GET_PRODUCT_BY_CATEGORY}/${category}`);
    return response.data;
  };
  
  // React Query Hook
  export const useProductByCategory = (category: String) => {
    return useQuery({
      queryKey: ['product-detail', category], // Include `id` for query uniqueness
      queryFn: () => fetchProductByCategory(category), // Fetch function
      staleTime: 1000 * 60 * 5, // Cache for 5 minutes
      retry: 3,                 // Retry on failure
      refetchOnWindowFocus: false, // No auto-refetch on focus
    });
  };
