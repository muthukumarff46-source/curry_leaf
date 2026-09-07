import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, LogOut, User, Search, Menu, X } from 'lucide-react';
import { cartApi } from '../api/cartApi';

const Navbar = () => {
    const { user, isAdmin, logout } = useAuth();
    const [cartCount, setCartCount] = React.useState(0);
    const [menuOpen, setMenuOpen] = React.useState(false);
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
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-[0_4px_24px_rgba(75,38,22,0.06)]">
            <div className="bg-primary-600 text-white text-center py-2 brand-sans text-[10px] font-bold">
                Free Shipping on Orders Above ₹499 <span className="mx-2 opacity-50">|</span> 100% Natural &amp; Premium Quality
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex min-w-0 items-center justify-between h-[76px] gap-3">
                    <div className="flex min-w-0 flex-1 items-center">
                        <Link to="/" className="flex min-w-0 flex-shrink-0 items-center group transition-all" aria-label="Curryleaf Essential home">
                            <span className="h-14 w-24 overflow-hidden flex items-center justify-center"><img src="/curryleaf-logo.jpeg" alt="CurryLeaf Essential" className="h-24 w-24 max-w-none object-contain mix-blend-multiply scale-125" /></span>
                            <span className="ml-2 hidden xl:block text-xs font-bold text-stone-500 brand-sans whitespace-nowrap">Natural pantry essentials</span>
                        </Link>
                        <div className="hidden lg:flex ml-auto mr-auto items-center gap-5 brand-sans text-[10px] font-bold text-stone-600">
                            {['Home', 'Shop', 'Categories', 'Combo Offers', 'Recipes', 'Blog', 'About Us', 'Contact'].map((label) => (
                                <Link key={label} to={label === 'Home' ? '/' : '/'} className="hover:text-primary-600 transition-colors whitespace-nowrap">{label}</Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-1 sm:gap-2">
                        <button className="hidden md:block p-2 text-stone-600 hover:text-primary-600" title="Search"><Search className="h-5 w-5" /></button>
                        {user ? (
                            <>
                                {!isAdmin && (
                                    <Link to="/cart" className="text-stone-600 hover:text-primary-600 transition-all relative p-2 rounded-xl" title="Cart">
                                        <ShoppingCart className="h-6 w-6" />
                                        {cartCount > 0 && (
                                            <span className="absolute top-0 right-0 h-4 w-4 bg-primary-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-300">
                                                {cartCount}
                                            </span>
                                        )}
                                    </Link>
                                )}
                                <div className="hidden sm:flex items-center space-x-3 bg-stone-50 px-3 py-2 rounded-full border border-stone-200">
                                    <div className="bg-primary-100 p-1.5 rounded-full text-primary-700">
                                        <User className="h-4 w-4" />
                                    </div>
                                    <span className="text-sm font-bold text-stone-700">{user.name}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-stone-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
                                    title="Logout"
                                >
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </>
                        ) : (
                            <div className="space-x-4 flex items-center">
                                <Link to="/login" className="hidden md:inline text-stone-600 hover:text-primary-600 font-bold transition-colors">Login</Link>
                                <Link to="/login" className="p-2 text-stone-600 md:hidden" title="Account"><User className="h-5 w-5" /></Link>
                                <Link to="/register" className="hidden md:inline bg-primary-600 text-white px-5 py-2.5 rounded-full font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-900/20 active:scale-95">Register</Link>
                            </div>
                        )}
                        <button className="lg:hidden p-2 text-stone-700" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
                            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
                {menuOpen && <div className="lg:hidden border-t border-stone-100 py-4 grid grid-cols-2 gap-4 brand-sans text-xs font-bold text-stone-600">
                    {['Home', 'Shop', 'Categories', 'Combo Offers', 'Recipes', 'Blog', 'About Us', 'Contact'].map((label) => <Link key={label} to="/" onClick={() => setMenuOpen(false)} className="py-2 hover:text-primary-600">{label}</Link>)}
                </div>}
            </div>
        </nav>
    );
};

export default Navbar;
