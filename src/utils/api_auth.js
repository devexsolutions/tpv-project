// utils/api-auth.js
import { verify } from 'jsonwebtoken';

export function withAuth(handler) {
  return async (req, res) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new Error('No token provided');
      }

      const decoded = verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      return handler(req, res);
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(401).json({ message: 'No autorizado' });
    }
  };
}