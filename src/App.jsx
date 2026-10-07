import { useState } from 'react';
import './App.css';
import AboutUs from './AboutUs';
import ProductList from './ProductList';
import CartItem from './CartItem';

function App() {
  // 'home' | 'plants' | 'cart'
  const [page, setPage] = useState('home');

  if (page === 'plants') return <ProductList go={setPage} />;
  if (page === 'cart') return <CartItem go={setPage} />;

  return (
    <div className="landing">
      <div className="landing-content">
        <h1>Paradise Nursery</h1>
        <p className="tagline">Houseplants that make a home feel alive.</p>
        <button className="btn btn-primary" onClick={() => setPage('plants')}>
          Get Started
        </button>
      </div>
      <AboutUs />
    </div>
  );
}

export default App;
