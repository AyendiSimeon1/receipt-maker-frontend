import React, { useState } from 'react';

type Product = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

interface PurchaseFormProps {
  selectedProduct: Product | null;
  onPurchase: (quantity: number, customerName: string) => void;
}

const PurchaseForm: React.FC<PurchaseFormProps> = ({ selectedProduct, onPurchase }) => {
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState<string>('');

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
      <input
        type="text"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        placeholder="Customer Name"
        className="w-full p-2 border rounded mt-2"
      />
      <button
        onClick={() => onPurchase(quantity, customerName)}
        className="w-full bg-[#ffd495] text-black p-2 rounded mt-2"
      >
        Purchase
      </button>
    </div>
  );
};

export default PurchaseForm;
