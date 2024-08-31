import React, { useState } from 'react';

type Product = {
  _id: string
  name: string
  price: number
  quantity: number
}


interface PurchaseFormProps {
  selectedProduct: Product | null;
  onPurchase: (quantity: number) => void;
  onCreateProduct: (product: Product) => void; 

const PurchaseForm: React.FC<PurchaseFormProps> = ({ selectedProduct, onPurchase, onCreateProduct }) => {
  const [quantity, setQuantity] = useState(1);
  const [ customerName, setCustomerName] = useState<string>('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    quantity: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: name === 'price' || name === 'quantity' ? Number(value) : value,
      
    });
  };


  const handleCreateProduct = () => {
    if (newProduct.name && newProduct.price > 0 && newProduct.quantity > 0) {
      const productToCreate = {
        _id: Date.now().toString(), 
        ...newProduct,
      };
      onCreateProduct(productToCreate);
      setNewProduct({ name: '', price: 0, quantity: 0 }); 
    } else {
      alert('Please fill in all fields correctly.');
    }
  };

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

      <hr className="my-4" />

      <h3 className="text-xl font-semibold mb-2">Create New Product</h3>
      <input
        type="text"
        name="name"
        value={newProduct.name}
        onChange={handleChange}
        placeholder="Product Name"
        className="w-full p-2 border rounded mt-2"
      />
      <input
        type="number"
        name="price"
        value={newProduct.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full p-2 border rounded mt-2"
        min={0}
      />
      <input
        type="number"
        name="quantity"
        value={newProduct.quantity}
        onChange={handleChange}
        placeholder="Quantity"
        className="w-full p-2 border rounded mt-2"
        min={0}
      />
      <button
        onClick={handleCreateProduct}
        className="w-full bg-[#ffd495] text-black p-2 rounded mt-2"
      >
        Create Product
      </button>
    </div>
  );
};

export default PurchaseForm;
