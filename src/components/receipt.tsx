import React from 'react';

 interface Product {
    _id: string;
    name: string;
    price: number;
    quantity: number;
  }
   interface Purchase {
    _id: string;
    productId: string;
    quantity: number;
    totalPrice: number;
    date: string;
  }

interface ReceiptProps {
  purchase: Purchase;
  //product: Product;
}

const Receipt: React.FC<ReceiptProps> = ({ purchase }) => {
  // if (!product) return null;

  return (
    <div className="mt-8 p-4 border rounded">
      <h3 className="text-xl font-semibold mb-2">Receipt</h3>
      {/* <p>Product: {product.name}</p>
      <p>Quantity: {purchase.quantity}</p>
      <p>Price per unit: ${product.price}</p> */}
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