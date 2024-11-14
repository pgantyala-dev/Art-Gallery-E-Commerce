import React from 'react';
import { useLocation, Navigate, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export function OrderSuccessPage() {
  const location = useLocation();
  const { orderNumber, email } = location.state || {};

  if (!orderNumber) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank you for your order!
          </h1>
          <p className="text-gray-600 mb-6">
            We've received your order and will send you a confirmation email at{' '}
            <span className="font-semibold">{email}</span>
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600 mb-2">Order Number</p>
            <p className="text-xl font-mono font-semibold">{orderNumber}</p>
          </div>
          <Link
            to="/"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}