// pages/pos.js
import { withAuth } from '../components/withAuth';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryList from '../components/CategoryList';
import ProductList from '../components/ProductList';
import NumericKeypad from '../components/NumericKeypad';
import OrderSummary from '../components/OrderSummary';

function POS() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentOrder, setCurrentOrder] = useState([]);
  const [quantity, setQuantity] = useState('1');

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  async function fetchCategories() {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  async function fetchProducts(categoryId = null) {
    try {
      const url = categoryId ? `/api/products?category=${categoryId}` : '/api/products';
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  function handleCategorySelect(categoryId) {
    setSelectedCategory(categoryId);
    fetchProducts(categoryId);
  }

  function handleProductSelect(product) {
    const existingItem = currentOrder.find(item => item.id === product.id);
    if (existingItem) {
      const updatedOrder = currentOrder.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + parseInt(quantity) } : item
      );
      setCurrentOrder(updatedOrder);
    } else {
      setCurrentOrder([...currentOrder, { ...product, quantity: parseInt(quantity) }]);
    }
    setQuantity('1');
  }

  function handleQuantityChange(value) {
    setQuantity(value);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">POS</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <CategoryList 
            categories={categories} 
            onSelectCategory={handleCategorySelect} 
            selectedCategory={selectedCategory}
          />
          <ProductList 
            products={products} 
            onSelectProduct={handleProductSelect}
          />
        </div>
        <div>
          <NumericKeypad 
            value={quantity} 
            onChange={handleQuantityChange}
          />
          <OrderSummary 
            orderItems={currentOrder}
            onUpdateQuantity={(id, newQuantity) => {
              const updatedOrder = currentOrder.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
              );
              setCurrentOrder(updatedOrder);
            }}
            onRemoveItem={(id) => {
              const updatedOrder = currentOrder.filter(item => item.id !== id);
              setCurrentOrder(updatedOrder);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default withAuth(POS);
