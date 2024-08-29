import { withAuth } from '../components/withAuth';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '' });

  useEffect(() => {
    fetchMenu();
  }, []);

  async function fetchMenu() {
    try {
      const response = await axios.get('/api/menu');
      setMenuItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching menu:', error);
      setLoading(false);
    }
  }

  async function handleAddItem(e) {
    e.preventDefault();
    try {
      await axios.post('/api/menu', newItem);
      setNewItem({ name: '', description: '', price: '' });
      fetchMenu();
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  }

  if (loading) {
    return <div>Cargando menú...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Menú</h1>
    
      <form onSubmit={handleAddItem} className="mb-8 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Agregar nuevo elemento</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Nombre"
            value={newItem.name}
            onChange={(e) => setNewItem({...newItem, name: e.target.value})}
            className="border rounded px-2 py-1"
            required
          />
          <input
            type="text"
            placeholder="Descripción"
            value={newItem.description}
            onChange={(e) => setNewItem({...newItem, description: e.target.value})}
            className="border rounded px-2 py-1"
          />
          <input
            type="number"
            placeholder="Precio"
            value={newItem.price}
            onChange={(e) => setNewItem({...newItem, price: e.target.value})}
            className="border rounded px-2 py-1"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Agregar elemento
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div key={item.id} className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <p className="text-lg font-bold">${parseFloat(item.price).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withAuth(Menu);
