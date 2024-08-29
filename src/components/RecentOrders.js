// components/RecentOrders.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function RecentOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchRecentOrders() {
      try {
        const response = await axios.get('/api/recent-orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching recent orders:', error);
      }
    }

    fetchRecentOrders();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Pedidos Recientes</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id} className="mb-2 p-2 border-b">
            <span className="font-medium">#{order.id}</span> - 
            <span className={`ml-2 ${order.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
              {order.status}
            </span>
            <span className="ml-2">${order.total.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}