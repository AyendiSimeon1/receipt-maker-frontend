import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addProduct, updateProduct } from '../redux/productSlice';
import ProductList from '../components/productList';
import PurchaseForm from '../components/purchaseForm';
import Receipt from '../components/receipt';
import axios from 'axios';
import { fetchProducts } from '../redux/productSlice';
import { useAppDispatch } from '../store';

export interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  
}

export interface Purchase {
  _id: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  date: string;
  customerName: string; 
}

const API_BASE_URL = 'http://localhost:3004';

const AdminPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products } = useSelector((state: RootState) => state.product);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lastPurchase, setLastPurchase] = useState<Purchase | null>(null);
  const [lastProduct, setLastProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const state = useSelector((state: RootState) => state);

  console.log({ 'Data stored': products });
  console.log('Entire Redux State:', state);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleCreateProduct = async (product: Product) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/createProduct`, product);
      if (response.status === 201) {
        console.log('Product created successfully');
        dispatch(addProduct(response.data));
        setLastProduct(response.data);
      }
    } catch (error) {
      console.error(error);
      setError('Failed to create product. Please try again later.');
    }
  };

  const handlePurchase = (quantity: number, customerName: string) => {
    if (selectedProduct) {
      const purchase: Purchase = {
        _id: Date.now().toString(),
        productId: selectedProduct._id,
        quantity: quantity,
        totalPrice: selectedProduct.price * quantity,
        date: new Date().toISOString(),
        customerName: customerName, // Capture customerName here
      };
      setLastPurchase(purchase);
    }
  };
  

  return (
    <div className="min-h-screen bg-[#f8f5f1] flex flex-col p-4">
      <header className="w-full max-w-4xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Store Admin</h1>
        <button className="bg-[#ffd495] text-black px-4 py-2 rounded-md">Logout</button>
      </header>
      
      <main className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Inventory Management</h2>

        {loading && (
          <div className="flex justify-center items-center">
            <div className="w-12 h-12 border-4 border-t-4 border-[#ffd495] border-solid rounded-full animate-spin"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 text-red-800 p-4 mb-4 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-8">
          <ProductList
            products={products}
            onSelectProduct={setSelectedProduct}
          />
          
          <PurchaseForm
            selectedProduct={selectedProduct}
            onPurchase={handlePurchase}
            // onCreateProduct={handleCreateProduct}
          />

        </div>
        
        {lastPurchase && selectedProduct && (
          <Receipt purchase={lastPurchase} product={selectedProduct} />
        )}
      </main>
      
      <footer className="mt-8 text-sm text-gray-500 text-center">
        Copyright @Razor 2024 | Privacy Policy
      </footer>
    </div>
  );
};

export default AdminPanel;
