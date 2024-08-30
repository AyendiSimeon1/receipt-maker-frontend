import React from 'react';

export interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string; // Optional image URL
}

interface ProductListProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onSelectProduct }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Products</h3>
      <h2>Hello World</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div 
            key={product._id} 
            className="border border-gray-300 rounded-lg overflow-hidden shadow-md"
          >
            {/* <img 
              src={product.imageUrl || 'default-image-url.jpg'} 
              alt={product.name} 
              className="w-full h-48 object-cover" 
            /> */}
            <div className="p-4">
              <h4 className="text-lg font-bold">{product.name}</h4>
              <p className="text-gray-700">${product.price}</p>
              <p className="text-gray-500">Qty: {product.quantity}</p>
              <button 
                onClick={() => onSelectProduct(product)} 
                className="mt-4 bg-[#ffd495] text-black px-4 py-2 rounded-md w-full"
              >
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
