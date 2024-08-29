// pages/api/menu.js
import { withAuth } from '../../utils/api-auth';
import axios from 'axios';

const API_URL = process.env.TASTYIGNITER_API_URL;

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const response = await axios.get(`${API_URL}/api/menu_items`, {
        headers: { 'Authorization': `Bearer ${req.user.token}` }
      });
      const menuItems = response.data.data.map(item => ({
        id: item.menu_id,
        name: item.menu_name,
        description: item.menu_description,
        price: item.menu_price
      }));
      res.status(200).json(menuItems);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      res.status(500).json({ message: 'Error al obtener los elementos del menú' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, description, price } = req.body;
      const response = await axios.post(`${API_URL}/api/menu_items`, {
        menu_name: name,
        menu_description: description,
        menu_price: price
      }, {
        headers: { 'Authorization': `Bearer ${req.user.token}` }
      });
      res.status(201).json(response.data);
    } catch (error) {
      console.error('Error adding menu item:', error);
      res.status(500).json({ message: 'Error al agregar el elemento al menú' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withAuth(handler);
