import React, { useState, useEffect } from 'react';
import { productApi } from '../api/productApi';
import { cartApi } from '../api/cartApi';
import ProductCard from '../components/ProductCard';
import { Search, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { user, isAdmin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await productApi.getAll();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (productId) => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (isAdmin) {
             alert("Admins don't have a cart. Please use a user account to shop.");
             return;
        }
        try {
            await cartApi.addItem({ product_id: productId, quantity: 1 });
            window.dispatchEvent(new Event('cart-updated'));
            alert('Added to cart!');
        } catch (error) {
            alert('Failed to add to cart');
        }
    };

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <Loader2 className="h-10 w-10 text-primary-600 animate-spin" />
            <p className="text-gray-500 font-medium">Loading amazing products...</p>
        </div>
    );

    return (
        <div className="space-y-12 animate-in fade-in duration-700">
            {/* Hero Section */}
            <div className="relative bg-white p-10 md:p-16 rounded-[3rem] shadow-xl shadow-gray-100/50 border border-gray-50 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full -ml-32 -mb-32 blur-3xl opacity-50" />
                
                <div className="relative flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="text-center md:text-left space-y-4 max-w-xl">
                        <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight">
                            Elevate Your <span className="text-primary-600">Lifestyle</span>
                        </h1>
                        <p className="text-lg text-gray-500 font-medium leading-relaxed">
                            Discover our handpicked collection of premium products, designed for those who appreciate the finer details.
                        </p>
                    </div>
                    
                    <div className="relative w-full md:w-96 group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary-600 transition-colors" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-primary-100 focus:bg-white transition-all font-bold shadow-sm"
                            placeholder="Find your next favorite..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Trending Collection</h2>
                    <div className="h-px flex-grow bg-gray-100 mx-8 hidden md:block" />
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                        {filteredProducts.length} items
                    </span>
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map(product => (
                            <ProductCard 
                                key={product._id} 
                                product={product} 
                                addToCart={handleAddToCart} 
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
                        <div className="bg-white p-4 rounded-2xl inline-block shadow-sm mb-4">
                            <Search className="h-10 w-10 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-black text-gray-900 mb-2">No matching pieces found</h3>
                        <p className="text-gray-500 font-medium">Try a different search term or category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
