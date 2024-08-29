// components/ProductList.js
export default function ProductList({ products, onSelectProduct }) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() => onSelectProduct(product)}
            className="bg-white shadow rounded-lg p-4 text-center hover:bg-gray-50"
          >
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
          </button>
        ))}
      </div>
    );
  }
  