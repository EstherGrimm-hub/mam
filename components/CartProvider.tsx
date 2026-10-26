"use client";

import { createContext, startTransition, useContext, useEffect, useState, type ReactNode } from "react";

export type CartLine = { productId: string; quantity: number };

type CartContextValue = {
  items: CartLine[];
  itemCount: number;
  cartRevision: number;
  addItem: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "mam-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [cartRevision, setCartRevision] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let restoredItems: CartLine[] = [];
    try {
      const savedItems = localStorage.getItem(STORAGE_KEY);
      if (savedItems) {
        const parsed = JSON.parse(savedItems) as CartLine[];
        if (Array.isArray(parsed)) {
          restoredItems = parsed.filter((line) => Number.isInteger(line.quantity) && line.quantity > 0);
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    startTransition(() => {
      setItems(restoredItems);
      setIsHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (isHydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [isHydrated, items]);

  function addItem(productId: string, quantity = 1) {
    setItems((current) => {
      const existing = current.find((line) => line.productId === productId);
      return existing
        ? current.map((line) => line.productId === productId ? { ...line, quantity: line.quantity + quantity } : line)
        : [...current, { productId, quantity }];
    });
    setCartRevision((revision) => revision + 1);
  }

  function setQuantity(productId: string, quantity: number) {
    if (quantity < 1) return removeItem(productId);
    setItems((current) => current.map((line) => line.productId === productId ? { ...line, quantity } : line));
  }

  function removeItem(productId: string) {
    setItems((current) => current.filter((line) => line.productId !== productId));
  }

  function clearCart() {
    setItems([]);
  }

  const itemCount = items.reduce((total, line) => total + line.quantity, 0);

  return (
    <CartContext.Provider value={{ items, itemCount, cartRevision, addItem, setQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart cần được dùng bên trong CartProvider");
  return context;
}