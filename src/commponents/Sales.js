import React, { useEffect, useState } from 'react';
import { fetchProducts, makeSale } from '../services/api';

const Sales = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(10);
  const [cart, setCart] = useState([]);
  const [finalTotal, setFinalTotal] = useState(null);

  useEffect(() => {
    fetchProducts().then(res => setProducts(res.data));
  }, []);

  const handleAddToCart = () => {
    const selectedProduct = products.find(p => p.id === productId);
    if (!selectedProduct) return alert('Select a valid product');

    setCart([
      ...cart,
      {
        productId,
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity: parseInt(quantity),
        discount: parseFloat(discount),
      }
    ]);

    // Reset form
    setProductId('');
    setQuantity(1);
    setDiscount(10);
  };

  const handleCheckout = async () => {
    let total = 0;

    for (let item of cart) {
      try {
        const res = await makeSale(item.productId, item.quantity, item.discount);
        total += res.data.finalTotal;
      } catch (err) {
        alert(`Error for ${item.name}: ${err.response.data.error}`);
      }
    }

    setFinalTotal(total.toFixed(2));
    setCart([]);
  };

  return (
    <div>
      <h2>Sales</h2>

      <select value={productId} onChange={e => setProductId(e.target.value)}>
        <option value="">Select a product</option>
        {products.map(p => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>

      <input
        type="number"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
        placeholder="Quantity"
      />
      <input
        type="number"
        value={discount}
        onChange={e => setDiscount(e.target.value)}
        placeholder="Discount"
      />
      <button onClick={handleAddToCart}>Add to Cart</button>

      <h3>🛒 Cart</h3>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul>
          {cart?.map((item, index) => {
            const markedUpPrice = item.price * 1.2;
            const discounted = markedUpPrice * (1 - item.discount / 100);
            const itemTotal = discounted * item.quantity;
            return (
              <li key={index}>
                {item.name} - Qty: {item.quantity}, Discount: {item.discount}% → ₹{itemTotal.toFixed(2)}
              </li>
            );
          })}
        </ul>
      )}

      <button onClick={handleCheckout} disabled={cart.length === 0}>Checkout</button>

      {finalTotal && <p><strong>Final Total: ₹{finalTotal}</strong></p>}
    </div>
  );
};

export default Sales;
