import api from './axiosConfig';

export const cartApi = {
    get: () => api.get('/cart/'),
    addItem: (data) => api.post('/cart/', data),
    updateQty: (data) => api.put('/cart/', data),
    remove: (id) => api.delete(`/cart/${id}`),
};
