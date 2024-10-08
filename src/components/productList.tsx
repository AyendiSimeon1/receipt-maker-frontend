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
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Products</h2>
      <div className="space-y-6">
        {products.map(product => (
          <div
            key={product._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-[1.02] flex flex-col md:flex-row"
          >
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full md:w-1/3 h-64 md:h-auto object-cover"
              />
            ) : (
              <div className="w-full md:w-1/3 h-64 md:h-auto bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
            <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-700 text-xl mb-4">₦{product.price.toFixed(2)}</p>
                <p className="text-gray-600 text-lg">Quantity: {product.quantity}</p>
              </div>
              <button
                onClick={() => onSelectProduct(product)}
                className="mt-6 bg-[#ffd495] text-black px-8 py-4 rounded-md hover:bg-[#ffc680] transition-colors text-xl font-medium self-start"
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