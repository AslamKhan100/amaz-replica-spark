import * as React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  asin: string;
  title: string;
  price: string;
  thumbnailImage: string;
  quantity: number;
  url: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (asin: string) => void;
  updateQuantity: (asin: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('shopping-cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: any) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.asin === product.asin);
      
      if (existingItem) {
        return currentItems.map(item =>
          item.asin === product.asin
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...currentItems, {
        asin: product.asin,
        title: product.title,
        price: product.price || '0',
        thumbnailImage: product.thumbnailImage,
        quantity: 1,
        url: product.url
      }];
    });
  };

  const removeFromCart = (asin: string) => {
    setItems(currentItems => currentItems.filter(item => item.asin !== asin));
  };

  const updateQuantity = (asin: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(asin);
      return;
    }
    
    setItems(currentItems =>
      currentItems.map(item =>
        item.asin === asin ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};