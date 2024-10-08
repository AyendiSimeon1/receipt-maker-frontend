import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import ProductList from '../components/productList';
import PurchaseForm from '../components/purchaseForm';
import Receipt from '../components/receipt';
import { fetchProducts } from '../redux/productSlice';
import { useAppDispatch } from '../store';
import { logout } from '../redux/authSlice'; 
import { useNavigate } from 'react-router-dom'; 
import doubleglory from '../assets/double-glory.jpg';
import { Link } from 'react-router-dom';
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

const AdminPanel: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state: RootState) => state.product);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lastPurchase, setLastPurchase] = useState<Purchase | null>(null);
  // const [showCreateProductForm, setShowCreateProductForm] = useState<boolean>(false); // Toggle for create product form
  const state = useSelector((state: RootState) => state);

  console.log({ 'Data stored': products });
  console.log('Entire Redux State:', state);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handlePurchase = (quantity: number, customerName: string) => {
    if (selectedProduct) {
      const purchase: Purchase = {
        _id: Date.now().toString(),
        productId: selectedProduct._id,
        quantity: quantity,
        totalPrice: selectedProduct.price * quantity,
        date: new Date().toISOString(),
        customerName: customerName,
      };
      setLastPurchase(purchase);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    // Redirect logic or additional logout actions
  };

  const handleCreateProductClick = () => {
    navigate('/create'); 
  };

  return (
    <div className="min-h-screen bg-[#f8f5f1] flex flex-col p-4">
      <header className="w-full max-w-4xl mx-auto flex justify-between items-center mb-8">
       
        <img src={doubleglory} alt="Example" className="w-64 h-auto rounded-md" />
        <div>
          <button 
            onClick={handleCreateProductClick} 
            className="bg-[#ffd495] text-white px-4 py-2 rounded-md mr-4">
            Create Product
          </button>
          <Link to='/transactions'>
          <button 
            
            className="bg-[#ffd495] text-white px-4 py-2 rounded-md mr-4">
            All Transactions
          </button>
          </Link>
          <button 
            onClick={handleLogout} 
            className="bg-[#ffd495] text-black px-4 py-2 rounded-md">
            Logout
          </button>
        </div>
      </header>

      <main className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Inventory Management</h2>

        <div className="grid grid-cols-2 gap-8">
          <ProductList
            products={products}
            onSelectProduct={setSelectedProduct}
          />
          
          <PurchaseForm
            selectedProduct={selectedProduct}
            onPurchase={handlePurchase}
          />

          
        </div>
        
        

        {lastPurchase && selectedProduct && (
          <Receipt purchase={lastPurchase} product={selectedProduct} />
        )}
      </main>

      <footer className="mt-8 text-sm text-gray-500 text-center">
        Copyright @Double Glory Store 2024 | Privacy Policy
      </footer>
    </div>
  );
};

export default AdminPanel;
