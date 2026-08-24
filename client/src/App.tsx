import { useEffect, useState } from 'react';
import { fetchHealth, fetchProducts, placeOrder } from './api';
import type { Product } from './types';

type BackendStatus = 'checking' | 'ok' | 'unreachable';

function App() {
  const [backendStatus, setBackendStatus] = useState<BackendStatus>('checking');
  const [products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function checkBackend() {
      try {
        const status = await fetchHealth();
        setBackendStatus(status === 'ok' ? 'ok' : 'unreachable');
      } catch {
        setBackendStatus('unreachable');
      }
    }

    checkBackend();
  }, []);

  useEffect(() => {
    async function loadProducts() {
      try {
        setProducts(await fetchProducts());
      } catch {
        setMessage('Could not load products. Is the backend running?');
      }
    }

    loadProducts();
  }, []);

  async function handleAddToCart(product: Product) {
    setMessage(`Adding "${product.name}"...`);

    try {
      await placeOrder(product.id, 1);
      setProducts((current) =>
        current.map((item) =>
          item.id === product.id ? { ...item, stock: item.stock - 1 } : item,
        ),
      );
      setMessage(`Added "${product.name}" to your cart.`);
    } catch {
      setMessage(`Could not add "${product.name}" to your cart.`);
    }
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>QuickCart</h1>
        <p className="status">
          Backend status:{' '}
          <strong className={backendStatus === 'ok' ? 'status-ok' : 'status-bad'}>
            {backendStatus === 'checking' ? 'checking...' : backendStatus}
          </strong>
        </p>
      </header>

      {message && <p className="message">{message}</p>}

      <section>
        <h2>Products</h2>

        {products.length === 0 ? (
          <p>No products to display.</p>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <article key={product.id} className="product-card">
                <h3>{product.name}</h3>
                <p className="description">{product.description}</p>
                <p className="price">₱{product.price.toLocaleString()}</p>
                <p className="stock">
                  Available stock: <strong>{product.stock}</strong>
                </p>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock <= 0 || backendStatus !== 'ok'}
                >
                  Add to Cart
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
