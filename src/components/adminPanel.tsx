// src/components/AdminPanel.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../redux/store';
// import { Product, Purchase } from '../types';
// import { makePurchase } from '../redux/inventorySlice';
import ProductList from './productList';
import PurchaseForm from './purchaseForm';
import Receipt from './receipt';


interface Product {

}

interface Purchase {

}

const AdminPanel: React.FC = () => {
  const dispatch = useDispatch();
  // const products = useSelector((state: RootState) => state.inventory.products);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [lastPurchase, setLastPurchase] = useState<Purchase | null>(null);

  const handlePurchase = (quantity: number) => {
    if (selectedProduct) {
      const purchase: Purchase = {
        id: Date.now().toString(),
        productId: selectedProduct.id,
        quantity,
        totalPrice: selectedProduct.price * quantity,
        date: new Date().toISOString(),
      };
      dispatch(makePurchase(purchase));
      setLastPurchase(purchase);
      setSelectedProduct(null);
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
        
        {lastPurchase && (
          <Receipt purchase={lastPurchase} product={products.find(p => p.id === lastPurchase.productId)} />
        )}
      </main>
      
      <footer className="mt-8 text-sm text-gray-500 text-center">
        Copyright @Razor 2024 | Privacy Policy
      </footer>
    </div>
  );
};

export default AdminPanel;