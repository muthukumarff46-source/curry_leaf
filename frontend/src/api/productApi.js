import api from './axiosConfig';

export const productApi = {
    getAll: () => api.get('/products'),
    getOne: (id) => api.get(`/products/${id}`),
    add: (data) => api.post('/products/', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
    update: (id, data) => api.put(`/products/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
    delete: (id) => api.delete(`/products/${id}`),
};
