import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Palette } from 'lucide-react';
import { Cart } from './Cart';

export function Header() {
  const { cart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Palette className="h-8 w-8" />
            <span className="text-xl font-semibold">Art Gallery</span>
          </div>
          <div className="relative">
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemsCount}
                </span>
              )}
            </button>
            {isCartOpen && (
              <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg overflow-hidden">
                <Cart />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}