import React, { useState } from 'react';
import { makePurchase } from '../services/api';

const Purchase = ({loadProducts}) => {

    let products = [
        { id: '1', name: 'Ring' },
        { id: '2', name: 'Shoes' }
    ];
    const [productId, setProductId] = useState('');
    const [quantity, setQuantity] = useState(1);

    const handlePurchase = async () => {
        await makePurchase(productId, parseInt(quantity));
        loadProducts()
        alert('Purchase successful');
    };

    return (
        <div>
            <h2>Purchase</h2>
            <select value={productId} onChange={e => setProductId(e.target.value)}>
                <option value="">Select a product</option>
                {products.map(p => (
                    <option key={p.id} value={p.id}>
                        {p.name}
                    </option>
                ))}
            </select>
            <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
            <button onClick={handlePurchase}>Purchase</button>
        </div>
    );
};

export default Purchase;
