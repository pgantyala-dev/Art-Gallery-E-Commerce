import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { Product } from '../types';
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { Trash2 } from 'lucide-react';

export function AdminDashboard() {
  const [artworks, setArtworks] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    dimensions: '',
    medium: '',
    genre: [] as string[],
    image: null as File | null,
  });

  useEffect(() => {
    loadArtworks();
  }, []);

  const loadArtworks = async () => {
    const querySnapshot = await getDocs(collection(db, 'artworks'));
    const artworks = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];
    setArtworks(artworks);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.image) {
        throw new Error('Please select an image');
      }

      // Upload image to Firebase Storage
      const imageRef = ref(storage, `artworks/${uuidv4()}`);
      await uploadBytes(imageRef, formData.image);
      const imageUrl = await getDownloadURL(imageRef);

      // Add artwork to Firestore
      await addDoc(collection(db, 'artworks'), {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        dimensions: formData.dimensions,
        medium: formData.medium,
        genre: formData.genre,
        image: imageUrl,
      });

      toast.success('Artwork added successfully!');
      loadArtworks();
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        price: '',
        dimensions: '',
        medium: '',
        genre: [],
        image: null,
      });
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (artworkId: string) => {
    if (window.confirm('Are you sure you want to delete this artwork?')) {
      try {
        await deleteDoc(doc(db, 'artworks', artworkId));
        toast.success('Artwork deleted successfully');
        loadArtworks();
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Add New Artwork</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Dimensions</label>
            <input
              type="text"
              value={formData.dimensions}
              onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Medium</label>
            <input
              type="text"
              value={formData.medium}
              onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
            rows={3}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Genre</label>
          <select
            multiple
            value={formData.genre}
            onChange={(e) => setFormData({
              ...formData,
              genre: Array.from(e.target.selectedOptions, option => option.value)
            })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
            required
          >
            <option value="Abstract">Abstract</option>
            <option value="Landscape">Landscape</option>
            <option value="Portrait">Portrait</option>
            <option value="Still Life">Still Life</option>
            <option value="Modern">Modern</option>
            <option value="Contemporary">Contemporary</option>
            <option value="Impressionism">Impressionism</option>
            <option value="Realism">Realism</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFormData({
              ...formData,
              image: e.target.files ? e.target.files[0] : null
            })}
            className="mt-1 block w-full"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-400"
        >
          {loading ? 'Adding...' : 'Add Artwork'}
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-6">Manage Artworks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map((artwork) => (
          <div key={artwork.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src={artwork.image}
              alt={artwork.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">{artwork.title}</h3>
              <p className="text-gray-500">${artwork.price}</p>
              <button
                onClick={() => handleDelete(artwork.id.toString())}
                className="mt-2 flex items-center text-red-600 hover:text-red-700"
              >
                <Trash2 size={16} className="mr-1" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}