// pages/api/orders/[id].js
import { withAuth } from '../../../utils/api-auth';
import axios from 'axios';

const API_URL = process.env.TASTYIGNITER_API_URL;

async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const response = await axios.get(`${API_URL}/api/orders/${id}`, {
        headers: { 'Authorization': `Bearer ${req.user.token}` }
      });

      const orderData = response.data.data;
      const order = {
        id: orderData.id,
        status: orderData.status,
        total: orderData.order_total,
        items: orderData.order_menus.map(item => ({
          id: item.menu_id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        }))
      };

      res.status(200).json(order);
    } catch (error) {
      console.error('Error fetching order details:', error);
      res.status(500).json({ message: 'Error al obtener los detalles del pedido' });
    }
  } else if (req.method === 'PATCH') {
    try {
      const { status } = req.body;
      await axios.patch(`${API_URL}/api/orders/${id}`, { status }, {
        headers: { 'Authorization': `Bearer ${req.user.token}` }
      });

      res.status(200).json({ message: 'Estado del pedido actualizado exitosamente' });
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ message: 'Error al actualizar el estado del pedido' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withAuth(handler);