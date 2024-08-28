
// src/components/PurchaseForm.tsx
import React, { useState } from 'react';
export interface Product {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }
  


interface PurchaseFormProps {
  selectedProduct: Product | null;
  onPurchase: (quantity: number) => void;
}

const PurchaseForm: React.FC<PurchaseFormProps> = ({ selectedProduct, onPurchase }) => {
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) return null;

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Make Purchase</h3>
      <p>{selectedProduct.name} - ${selectedProduct.price}</p>
      <input 
        type="number" 
        value={quantity} 
        onChange={(e) => setQuantity(Number(e.target.value))}
        min={1}
        max={selectedProduct.quantity}
        className="w-full p-2 border rounded mt-2"
      />
      <button 
        onClick={() => onPurchase(quantity)}
        className="w-full bg-[#ffd495] text-black p-2 rounded mt-2"
      >
        Purchase
      </button>
    </div>
  );
};

export default PurchaseForm;