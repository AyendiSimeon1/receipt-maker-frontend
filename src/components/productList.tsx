// src/components/ProductList.tsx
import React from 'react';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onSelectProduct }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Products</h3>
      <ul className="space-y-2">
        {products.map(product => (
          <li 
            key={product.id} 
            className="p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
            onClick={() => onSelectProduct(product)}
          >
            {product.name} - ${product.price} (Qty: {product.quantity})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;

// src/components/PurchaseForm.tsx
import React, { useState } from 'react';
import { Product } from '../types';

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

// src/components/Receipt.tsx
import React from 'react';
import { Product, Purchase } from '../types';

interface ReceiptProps {
  purchase: Purchase;
  product: Product | undefined;
}

const Receipt: React.FC<ReceiptProps> = ({ purchase, product }) => {
  if (!product) return null;

  return (
    <div className="mt-8 p-4 border rounded">
      <h3 className="text-xl font-semibold mb-2">Receipt</h3>
      <p>Product: {product.name}</p>
      <p>Quantity: {purchase.quantity}</p>
      <p>Price per unit: ${product.price}</p>
      <p>Total: ${purchase.totalPrice}</p>
      <p>Date: {new Date(purchase.date).toLocaleString()}</p>
      <button 
        onClick={() => window.print()}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Print Receipt
      </button>
    </div>
  );
};

export default Receipt;