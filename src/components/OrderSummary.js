// components/OrderSummary.js
export default function OrderSummary({ orderItems, onUpdateQuantity, onRemoveItem }) {
    const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
    return (
      <div>
        <h2 className="text-xl font-semibold mb-2">Resumen del Pedido</h2>
        <div className="bg-white shadow rounded-lg p-4">
          {orderItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <div>
                <span className="font-semibold">{item.name}</span>
                <span className="text-gray-600 ml-2">${item.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-l"
                >
                  -
                </button>
                <span className="bg-gray-100 py-1 px-2">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-r"
                >
                  +
                </button>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 text-xl font-bold">
            Total: ${total.toFixed(2)}
          </div>
        </div>
      </div>
    );
  }
  