import React, { useState } from 'react';

type Product = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

interface CreateProductProps {
  onCreateProduct: (product: Product) => void;
}

const CreateProducts: React.FC<CreateProductProps> = ({ onCreateProduct }) => {
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

  return (
    <div>
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

export default CreateProducts;
