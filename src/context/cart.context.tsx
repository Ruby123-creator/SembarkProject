import React, { useCallback, useReducer, useEffect, useMemo, createContext, useContext, PropsWithChildren } from 'react';

// Define Item interface
export interface Item {
  id: string | number;
  price: number;
  quantity?: number;
  stock?: number;
  isEnquiry?: boolean;
  [key: string]: any;
}

// Define Metadata interface
interface Metadata {
  [key: string]: any;
}

// Cart State
interface State {
  items: Item[];
  isEmpty: boolean;
  totalItems: number;
  totalUniqueItems: number;
  total: number;
  meta?: Metadata | null;
}

// Cart Actions
type Action =
  | { type: 'ADD_ITEM_WITH_QUANTITY'; item: Item; quantity: number }
  | { type: 'REMOVE_ITEM_OR_QUANTITY'; id: Item['id']; quantity?: number }
  | { type: 'RESET_CART' };

// Initial State
const initialState: State = {
  items: [],
  isEmpty: true,
  totalItems: 0,
  totalUniqueItems: 0,
  total: 0,
  meta: null,
};

// Helper Functions
const calculateTotalItems = (items: Item[]) =>
  items.reduce((sum, item) => sum + (item.quantity || 0), 0);

const calculateItemTotals = (items: Item[]) =>
  items.map((item) => ({
    ...item,
    itemTotal: item.price * (item.quantity || 0),
  }));

const calculateTotal = (items: Item[]) =>
  items.reduce((total, item) => total + (item.quantity || 0) * item.price, 0);

const addItemWithQuantity = (items: Item[], item: Item, quantity: number) => {
  if (quantity <= 0) throw new Error("Quantity can't be zero or less.");
  const existingItemIndex = items.findIndex((i) => i.id === item.id);

  if (existingItemIndex > -1) {
    const newItems = [...items];
    newItems[existingItemIndex].quantity! += quantity;
    return newItems;
  }

  return [...items, { ...item, quantity }];
};

const removeItemOrQuantity = (items: Item[], id: Item['id'], quantity: number = 1) =>
  items.reduce((acc: Item[], item) => {
    if (item.id === id) {
      const newQuantity = (item.quantity || 0) - quantity;
      if (newQuantity > 0) {
        acc.push({ ...item, quantity: newQuantity });
      }
    } else {
      acc.push(item);
    }
    return acc;
  }, []);

  function getItem(items: Item[], id: Item['id']) {
    return (items||[]).find((item) => item.id === id);
  }
  
const generateFinalState = (state: State, items: Item[]) => {
  const totalItems = calculateTotalItems(items);
  const total = calculateTotal(items);
  const isEmpty = totalItems === 0;

  return {
    ...state,
    items: calculateItemTotals(items),
    totalItems,
    totalUniqueItems: items.length,
    total,
    isEmpty,
  };
};

// Reducer Function
const cartReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_ITEM_WITH_QUANTITY': {
      const items = addItemWithQuantity(state.items, action.item, action.quantity);
      return generateFinalState(state, items);
    }
    case 'REMOVE_ITEM_OR_QUANTITY': {
      const items = removeItemOrQuantity(state.items, action.id, action.quantity);
      return generateFinalState(state, items);
    }
    case 'RESET_CART':

      return initialState;
    default:
      return state;
  }
};

// Cart Context Interface
interface CartContextState extends State {
  addItemToCart: (item: Item, quantity: number) => void;
  removeItemFromCart: (id: Item['id'], quantity?: number) => void;
  getItemFromCart: (id: Item['id']) => Item | undefined;
  isInCart: (id: Item['id']) => boolean;
  resetCart: () => void;
}

// Context Initialization
const CartContext = createContext<CartContextState | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Cart Provider Component
export const CartProvider = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(cartReducer, initialState, () => {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : initialState;
      });
    
      // Persist cart state to localStorage on change
      useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state));
      }, [state]);
  // Add Item
  const addItemToCart = (item: Item, quantity: number) => {
    dispatch({ type: 'ADD_ITEM_WITH_QUANTITY', item, quantity });
  };

  // Remove Item
  const removeItemFromCart = (id: Item['id'], quantity: number = 1) => {
    dispatch({ type: 'REMOVE_ITEM_OR_QUANTITY', id, quantity });
  };

  const resetCart = () => dispatch({ type: 'RESET_CART' });
  const isInCart = useCallback(
    (id: Item['id']) => !!getItem(state.items, id),
    [state.items]
  );
  // Get Item
  const getItemFromCart = useCallback(
    (id: Item['id']) => state.items.find((item) => item.id === id),
    [state.items]
  );

  // Memoize Context Value
  const value = useMemo(
    () => ({
      ...state,
      addItemToCart,
      removeItemFromCart,
      getItemFromCart,
      isInCart,
      resetCart
    }),
    [state, getItemFromCart, isInCart,]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
