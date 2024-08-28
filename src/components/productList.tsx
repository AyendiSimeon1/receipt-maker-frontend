

// interface Product {
//   id: string
//   name: string
//   price: number
//   quantity: number
// }

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

