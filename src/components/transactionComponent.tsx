import { useState, useEffect } from "react";

import axios from 'axios';

interface Purchase {
  _id: string;
  productId: string;
  quantity: number;

  date: string;
  customerName: string;
}

const TransactionComponent: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await axios.get('https://receipt-maker.onrender.com/product/get-purchases'); // Update with your endpoint URL
        setPurchases(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch purchases.');
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-4">Purchase History</h2>
      {purchases.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Customer</th>
              <th className="border border-gray-300 p-2">Product ID</th>
              <th className="border border-gray-300 p-2">Quantity</th>
              <th className="border border-gray-300 p-2">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase._id} className="odd:bg-white even:bg-gray-50">
                <td className="border border-gray-300 p-2">{new Date(purchase.date).toLocaleDateString()}</td>
                <td className="border border-gray-300 p-2">{purchase.customerName}</td>
                <td className="border border-gray-300 p-2">{purchase.productId}</td>
                <td className="border border-gray-300 p-2">{purchase.quantity}</td>
     
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No purchases found.</p>
      )}
    </div>
  );
};


export default TransactionComponent;