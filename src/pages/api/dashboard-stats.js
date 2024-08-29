// pages/api/dashboard-stats.js
import { withAuth } from '../../utils/api-auth';
import axios from 'axios';

const API_URL = process.env.TASTYIGNITER_API_URL;

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const [ordersResponse, salesResponse] = await Promise.all([
        axios.get(`${API_URL}/api/orders`, {
          headers: { 'Authorization': `Bearer ${req.user.token}` }
        }),
        axios.get(`${API_URL}/api/sales`, {
          headers: { 'Authorization': `Bearer ${req.user.token}` }
        })
      ]);

      const totalOrders = ordersResponse.data.data.length;
      const pendingOrders = ordersResponse.data.data.filter(order => order.status === 'pending').length;
      const revenue = salesResponse.data.data.reduce((total, sale) => total + sale.total, 0);

      const stats = {
        totalOrders,
        revenue,
        pendingOrders,
      };

      res.status(200).json(stats);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      res.status(500).json({ message: 'Error al obtener las estadísticas del dashboard' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withAuth(handler);