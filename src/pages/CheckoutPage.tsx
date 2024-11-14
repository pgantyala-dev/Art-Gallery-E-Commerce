import React from 'react';
import { CheckoutForm } from '../components/CheckoutForm';
import { useCart } from '../context/CartContext';
import { Navigate } from 'react-router-dom';

export function CheckoutPage() {
  const { cart } = useCart();

  if (cart.length === 0) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        <CheckoutForm />
      </div>
    </div>
  );
}