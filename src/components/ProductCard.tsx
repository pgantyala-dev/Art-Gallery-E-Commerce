import React, { useState } from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { ImagePreview } from './ImagePreview';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-[1.02]">
        <div className="relative h-80">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setShowPreview(true)}
          />
          <div className="absolute top-4 right-4 flex gap-2">
            {product.genre.map((genre) => (
              <span
                key={genre}
                className="px-2 py-1 text-xs font-medium bg-black bg-opacity-75 text-white rounded-full"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {product.title}
          </h3>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-500 text-sm">{product.dimensions}</span>
            <span className="text-gray-500 text-sm">{product.medium}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toLocaleString()}
            </span>
            <button
              onClick={() => addToCart(product)}
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {showPreview && (
        <ImagePreview
          image={product.image}
          title={product.title}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
}