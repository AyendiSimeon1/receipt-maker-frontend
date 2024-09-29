import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type Product = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

interface CreateProductProps {
  onCreateProduct: (product: Product) => void;
}

const CreateProduct: React.FC<CreateProductProps> = ({ onCreateProduct }) => {
  const navigate = useNavigate(); // Changed from useHistory to useNavigate
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    quantity: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: name === 'price' || name === 'quantity' ? Number(value) : value,
    });
  };

  const handleCreateProduct = async () => {
    if (newProduct.name && newProduct.price > 0 && newProduct.quantity > 0) {
      const productToCreate = {
        _id: Date.now().toString(),
        ...newProduct,
      };
      try {
        setLoading(true);
        setError(null);
        const response = await axios.post('https://receipt-maker.onrender.com/product/create-product', productToCreate);
        if (response.status === 201) {
          onCreateProduct(response.data);
          setNewProduct({ name: '', price: 0, quantity: 0 });
          navigate('/'); // Changed from history.push to navigate
        } else {
          throw new Error('Failed to create product');
        }
      } catch (err) {
        setError('Failed to create product. Please try again.');
        console.error('Error creating product:', err);
      } finally {
        setLoading(false);
      }
    } else {
      setError('Please fill in all fields correctly.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Create New Product</h2>
        <p className="text-gray-600 mb-4">Add a new product to your inventory</p>
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={newProduct.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
            <input
              id="price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={handleChange}
              placeholder="Enter price"
              min={0}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              value={newProduct.quantity}
              onChange={handleChange}
              placeholder="Enter quantity"
              min={0}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 bg-gray-50">
        <button
          onClick={handleCreateProduct}
          disabled={loading}
          className={`w-full px-4 py-2 text-white font-semibold rounded-lg ${
            loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating...
            </span>
          ) : (
            'Create Product'
          )}
        </button>
      </div>
    </div>
  );
};

export default CreateProduct;