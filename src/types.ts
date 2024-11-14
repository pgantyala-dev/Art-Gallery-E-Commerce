export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  dimensions: string;
  medium: string;
  genre: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export type Genre = 'Abstract' | 'Landscape' | 'Portrait' | 'Still Life' | 'Modern' | 'Contemporary' | 'Impressionism' | 'Realism';