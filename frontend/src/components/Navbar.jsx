import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, LogOut, LayoutDashboard, ShoppingBag, User, Loader2 } from 'lucide-react';
import { cartApi } from '../api/cartApi';

const Navbar = () => {
    const { user, isAdmin, logout } = useAuth();
    const [cartCount, setCartCount] = React.useState(0);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (user && !isAdmin) {
            const getCount = async () => {
                try {
                    const { data } = await cartApi.get();
                    const count = data.items.reduce((acc, item) => acc + item.quantity, 0);
                    setCartCount(count);
                } catch (error) {
                    console.error('Failed to fetch cart count');
                }
            };
            getCount();
            
            // Listen for cart refresh events if any (optional but good practice)
            window.addEventListener('cart-updated', getCount);
            return () => window.removeEventListener('cart-updated', getCount);
        }
    }, [user, isAdmin]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center group transition-all">
                            <div className="bg-primary-600 p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-primary-200">
                                <ShoppingBag className="h-6 w-6 text-white" />
                            </div>
                            <span className="ml-3 text-2xl font-black text-gray-900 tracking-tighter">MiniShop</span>
                        </Link>
                        <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                            <Link to="/" className="text-gray-500 hover:text-primary-600 inline-flex items-center px-1 pt-1 text-sm font-bold transition-colors">
                                Shop
                            </Link>
                            {user && !isAdmin && (
                                <Link to="/orders" className="text-gray-500 hover:text-primary-600 inline-flex items-center px-1 pt-1 text-sm font-bold transition-colors">
                                    My Orders
                                </Link>
                            )}
                            {isAdmin && (
                                <Link to="/admin" className="text-gray-500 hover:text-primary-600 inline-flex items-center px-1 pt-1 text-sm font-bold transition-colors">
                                    Admin Panel
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center space-x-6">
                        {user ? (
                            <>
                                {!isAdmin && (
                                    <Link to="/cart" className="text-gray-500 hover:text-primary-600 transition-all relative p-2 hover:bg-gray-50 rounded-xl">
                                        <ShoppingCart className="h-6 w-6" />
                                        {cartCount > 0 && (
                                            <span className="absolute top-0 right-0 h-4 w-4 bg-primary-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-300">
                                                {cartCount}
                                            </span>
                                        )}
                                    </Link>
                                )}
                                <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100 shadow-sm">
                                    <div className="bg-primary-100 p-1.5 rounded-lg text-primary-700">
                                        <User className="h-4 w-4" />
                                    </div>
                                    <span className="text-sm font-bold text-gray-700">{user.name}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                    title="Logout"
                                >
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </>
                        ) : (
                            <div className="space-x-4 flex items-center">
                                <Link to="/login" className="text-gray-500 hover:text-primary-600 font-bold transition-colors">Login</Link>
                                <Link to="/register" className="bg-primary-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 active:scale-95">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
