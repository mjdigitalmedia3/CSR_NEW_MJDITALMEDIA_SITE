import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Product, UpsellFeature, CartItem } from '@shared/schema';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, upsells: UpsellFeature[]) => void;
  removeFromCart: (productId: string) => void;
  updateUpsells: (productId: string, upsells: UpsellFeature[]) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product, upsells: UpsellFeature[]) => {
    const upsellTotal = upsells.reduce((sum, u) => sum + u.price, 0);
    const totalPrice = product.price + upsellTotal;

    setItems(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item =>
          item.productId === product.id
            ? { ...item, selectedUpsells: upsells, totalPrice }
            : item
        );
      }
      return [...prev, {
        productId: product.id!,
        product,
        selectedUpsells: upsells,
        totalPrice
      }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems(prev => prev.filter(item => item.productId !== productId));
  }, []);

  const updateUpsells = useCallback((productId: string, upsells: UpsellFeature[]) => {
    setItems(prev => prev.map(item => {
      if (item.productId === productId) {
        const upsellTotal = upsells.reduce((sum, u) => sum + u.price, 0);
        return {
          ...item,
          selectedUpsells: upsells,
          totalPrice: item.product.price + upsellTotal
        };
      }
      return item;
    }));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const itemCount = items.length;

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateUpsells,
      clearCart,
      total,
      itemCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
