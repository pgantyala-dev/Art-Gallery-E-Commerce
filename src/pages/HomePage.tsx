import React, { useState, useMemo } from 'react';
import { ProductCard } from '../components/ProductCard';
import { Search } from '../components/Search';
import { Product, Genre } from '../types';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

const allGenres: Genre[] = [
  'Abstract',
  'Landscape',
  'Portrait',
  'Still Life',
  'Modern',
  'Contemporary',
  'Impressionism',
  'Realism'
];

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const loadProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'artworks'));
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(products);
      setLoading(false);
    };

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = searchTerm === '' || 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.medium.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesGenre = selectedGenre === '' || 
        product.genre.includes(selectedGenre);

      return matchesSearch && matchesGenre;
    });
  }, [searchTerm, selectedGenre, products]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading artworks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Artworks
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover unique pieces that will transform your space. Each artwork is
            original and comes with a certificate of authenticity.
          </p>
        </div>
        
        <Search
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
          genres={allGenres}
        />

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No artworks found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}