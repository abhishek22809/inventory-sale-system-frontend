import React,{useState,useEffect} from 'react';
import Dashboard from './commponents/Dashboard';
import Purchase from './commponents/Purchase';
import Sales from './commponents/Sales';
import { fetchProducts } from './services/api';

import './styles.css';
function App() {
  const [products, setProducts] = useState([]);

   const loadProducts = async () => {
      const { data } = await fetchProducts();
      setProducts(data);
    };
  
    useEffect(() => {
      loadProducts();
    }, []);

  return (
    <div className="App" >
  <h1>Inventory Sale System</h1>
      <Dashboard products={products} />
      <Purchase loadProducts={loadProducts} />
      <Sales loadProducts={loadProducts} />
    </div>
  );
}

export default App;
