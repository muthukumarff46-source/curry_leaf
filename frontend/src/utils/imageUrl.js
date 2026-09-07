const API_URL = (import.meta.env.VITE_API_URL || 'https://curry-leaf.onrender.com').replace(/\/$/, '');
const fallbackImage = '/curryleaf-logo.jpeg';

export const getImageUrl = (imagePath) => {
    if (!imagePath || typeof imagePath !== 'string') {
        return fallbackImage;
    }

    const trimmedPath = imagePath.trim();
    if (!trimmedPath) {
        return fallbackImage;
    }

    if (/^https?:\/\//i.test(trimmedPath)) {
        return trimmedPath;
    }

    const normalizedPath = trimmedPath
        .replace(/^\/+/, '')
        .replace(/^backend\/app\/uploads\//i, 'uploads/')
        .replace(/^uploads\//i, 'uploads/');

    if (normalizedPath.startsWith('uploads/')) {
        return `${API_URL}/${normalizedPath}`;
    }

    return `/${normalizedPath}`;
};

export const getFallbackImage = () => fallbackImage;
