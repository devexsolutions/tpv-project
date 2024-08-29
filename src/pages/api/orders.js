// pages/api/orders.js
import { withAuth } from '../../utils/api-auth';
import axios from 'axios';

const API_URL = process.env.TASTYIGNITER_API_URL;

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const response = await axios.get(`${API_URL}/api/orders`, {
        headers: { 'Authorization': `Bearer ${req.user.token}` }
      });

      const orders = response.data.data.map(order => ({
        id: order.id,
        status: order.status,
        total: order.order_total
      }));

      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ message: 'Error al obtener los pedidos' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withAuth(handler);