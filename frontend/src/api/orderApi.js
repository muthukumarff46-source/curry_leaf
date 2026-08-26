import api from './axiosConfig';

export const orderApi = {
    place: () => api.post('/orders/'),
    getMy: () => api.get('/orders/my'),
    getAll: () => api.get('/orders/all'),
    updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
};
