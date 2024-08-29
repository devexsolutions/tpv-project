// pages/dashboard.js
import { withAuth } from '../components/';
import { useState, useEffect } from 'react';
import axios from 'axios';
import RecentOrders from '../components/RecentOrders';

function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    revenue: 0,
    pendingOrders: 0,
  });

  useEffect(() => {
    async function fetchDashboardStats() {
      try {
        const response = await axios.get('/api/dashboard-stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    }

    fetchDashboardStats();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Total de Pedidos</h2>
          <p className="text-3xl font-bold">{stats.totalOrders}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Ingresos</h2>
          <p className="text-3xl font-bold">${stats.revenue.toFixed(2)}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Pedidos Pendientes</h2>
          <p className="text-3xl font-bold">{stats.pendingOrders}</p>
        </div>
      </div>
      <RecentOrders />
    </div>
  );
}

export default withAuth(Dashboard);