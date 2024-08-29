// pages/api/categories.js
import { withAuth } from '../../utils/api-auth';
import axios from 'axios';

const API_URL = process.env.TASTYIGNITER_API_URL;

async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const response = await axios.get(`${API_URL}/api/categories`, {
        headers: { 'Authorization': `Bearer ${req.user.token}` }
      });
      const categories = response.data.data.map(category => ({
        id: category.category_id,
        name: category.name,
      }));
      res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ message: 'Error al obtener las categorías' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withAuth(handler);
