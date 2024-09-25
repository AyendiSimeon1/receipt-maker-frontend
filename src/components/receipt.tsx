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
    customerName: string;
  }

interface ReceiptProps {
  purchase: Purchase;
  product: Product;
}

const Receipt: React.FC<ReceiptProps> = ({ purchase, product }) => {
  // if (!product) return null;

  return (
    <div className="receipt-container mt-8 p-4 border rounded bg-white max-w-sm mx-auto">
    <h3 className="text-center text-2xl font-bold mb-4">Store Receipt</h3>
    <hr className="mb-4" />
    <p><strong>Product:</strong> {product?.name}</p>
    <p><strong>Customer:</strong> {purchase.customerName}</p>
    <p><strong>Quantity:</strong> {purchase?.quantity}</p>
    <p><strong>Price per unit:</strong> ${product.price.toFixed(2)}</p>
    <p><strong>Total:</strong> ${purchase.totalPrice.toFixed(2)}</p>
    <p><strong>Date:</strong> {new Date(purchase.date).toLocaleString()}</p>
    <hr className="my-4" />
    <p className="text-center">Thank you for your purchase!</p>
    <button 
      onClick={() => window.print()}
      className="mt-4 bg-[#ffd495] text-white px-4 py-2 rounded block w-full"
    >
      Print Receipt
    </button>

    <style>
      {`
        @media print {
          body * {
            visibility: hidden;
          }
          .receipt-container, .receipt-container * {
            visibility: visible;
          }
          .receipt-container {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            margin: auto;
            width: 100%;
          }
          .receipt-container {
            border: none;
            padding: 0;
            box-shadow: none;
          }
          button {
            display: none;
          }
        }
      `}
    </style>
  </div>
  );
};

export default Receipt;