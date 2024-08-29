// pages/api/products.js
import { withAuth } from '../../utils/api-auth';
import axios from 'axios';

const API_URL = process.env.TASTYIGNITER_API_URL;

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { category } = req.query;
      const url = category
        ? `${API_URL}/api/menu_items?category=${category}`
        : `${API_URL}/api/menu_items`;
    
      const response = await axios.get(url, {
        headers: { 'Authorization': `Bearer ${req.user.token}` }
      });
      const products = response.data.data.map(product => ({
        id: product.menu_id,
        name: product.menu_name,
        price: parseFloat(product.menu_price),
      }));
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Error al obtener los productos' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withAuth(handler);
