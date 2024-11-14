import React from 'react';
import { useCart } from '../context/CartContext';
import { Minus, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Cart({ onClose }: { onClose?: () => void }) {
  const { cart, removeFromCart, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (onClose) onClose();
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-gray-500">${item.price.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  updateQuantity(item.id, Math.max(0, item.quantity - 1))
                }
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Minus size={16} />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Plus size={16} />
              </button>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <X size={20} />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8 border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-2xl font-bold">${total.toLocaleString()}</span>
        </div>
        <button 
          onClick={handleCheckout}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}