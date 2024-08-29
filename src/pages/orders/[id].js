// pages/orders/[id].js
import { withAuth } from '../../components/withAuth';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

function OrderDetails() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function fetchOrderDetails() {
      if (id) {
        try {
          const response = await axios.get(`/api/orders/${id}`);
          setOrder(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching order details:', error);
          setLoading(false);
        }
      }
    }

    fetchOrderDetails();
  }, [id]);

  async function updateOrderStatus(newStatus) {
    try {
      await axios.patch(`/api/orders/${id}`, { status: newStatus });
      setOrder({ ...order, status: newStatus });
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  }

  if (loading) {
    return <div>Cargando detalles del pedido...</div>;
  }

  if (!order) {
    return <div>Pedido no encontrado</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Detalles del Pedido #{order.id}</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Información del Pedido
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Estado</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {order.status}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Total</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                ${order.total.toFixed(2)}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Artículos</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <li key={item.id} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <span className="ml-2 flex-1 w-0 truncate">{item.name}</span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        {item.quantity} x ${item.price.toFixed(2)}
                      </div>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Actualizar Estado
        </h3>
        <div className="flex space-x-4">
          <button
            onClick={() => updateOrderStatus('preparando')}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          >
            Preparando
          </button>
          <button
            onClick={() => updateOrderStatus('listo')}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Listo
          </button>
          <button
            onClick={() => updateOrderStatus('entregado')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Entregado
          </button>
        </div>
      </div>
    </div>
  );
}

export default withAuth(OrderDetails);