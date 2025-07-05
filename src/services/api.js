import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const fetchProducts = () => API.get('/products');
export const makePurchase = (productId, quantity) => API.post('/purchase', { productId, quantity });
export const makeSale = (productId, quantity, discount) => API.post('/sales/checkout', { productId, quantity, discount });