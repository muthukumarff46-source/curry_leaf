import React, { useState, useEffect } from 'react';
import { productApi } from '../api/productApi';
import { cartApi } from '../api/cartApi';
import ProductCard from '../components/ProductCard';
import { Search, Loader2, ArrowRight, Leaf, ShieldCheck, Truck, Sparkles, Heart, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getImageUrl } from '../utils/imageUrl';

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

    const categoryNames = ['Pressure Cookers', 'Cooker Combos', 'Everyday Cookers', 'Kitchen Essentials'];
    const benefits = [{ icon: Leaf, title: '100% Natural', desc: 'No additives' }, { icon: Sparkles, title: 'Premium Quality', desc: 'Handpicked spices' }, { icon: ShieldCheck, title: 'Hygienically Packed', desc: 'Sealed for freshness' }, { icon: Truck, title: 'Fast Delivery', desc: 'Across India' }];
    const featuredImages = [
        'https://curry-leaf.onrender.com/uploads/img3.png',
        'https://curry-leaf.onrender.com/uploads/img4.png',
        'https://curry-leaf.onrender.com/uploads/img2.png',
        'https://curry-leaf.onrender.com/uploads/img1.jpg'
    ];

    return (
        <div className="space-y-20 pb-8 fade-up">
            <section className="relative overflow-hidden rounded-[2rem] bg-[#f7eee2] min-h-[520px] flex items-center">
                <div className="leaf-pattern absolute inset-0" />
                <div className="relative z-10 px-7 py-16 md:px-16 max-w-2xl">
                    <p className="brand-sans text-primary-600 text-xs font-bold mb-6">The goodness of nature, packed for you</p>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.98] text-[#292521]">Pure Spices.<br /><span className="text-primary-600 italic font-normal">Pure Love.</span></h1>
                    <p className="mt-7 text-lg leading-8 text-stone-600 max-w-lg">Bringing you 100% natural, handpicked spices and essential products for a healthier you.</p>
                    <div className="mt-9 flex flex-wrap gap-3"><button onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} className="bg-primary-600 hover:bg-primary-700 text-white px-7 py-3.5 rounded-full font-bold shadow-lg shadow-primary-900/20 transition-all">Shop Now <ArrowRight className="inline ml-2 h-4 w-4" /></button><button onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })} className="border border-stone-300 text-stone-700 px-7 py-3.5 rounded-full font-bold hover:border-primary-600 hover:text-primary-600 transition-all">Explore Products</button></div>
                </div>
                <div className="absolute right-[-8%] bottom-[-8%] w-[58%] h-[90%] hidden md:block"><div className="absolute inset-10 rounded-full bg-[#ead5b7]" />{featuredImages.slice(0, 2).map((image, index) => <img key={image} src={getImageUrl(image)} alt={index === 0 ? 'CurryLeaf pressure cooker' : 'CurryLeaf kitchen essential'} className={`absolute object-cover rounded-[2rem] drop-shadow-2xl float-product ${index === 0 ? 'w-64 h-72 left-16 top-16 z-20' : 'w-52 h-60 right-4 top-5 z-10'}`} style={{ animationDelay: `${index * 0.7}s` }} onError={(e) => { e.currentTarget.src = getImageUrl(); }} />)}</div>
            </section>

            <section className="relative -mt-10 mx-3 md:mx-10 bg-white rounded-2xl shadow-[0_10px_40px_rgba(75,38,22,0.1)] border border-stone-100 grid grid-cols-2 md:grid-cols-4 divide-x divide-stone-100">
                {benefits.map(({ icon: Icon, title, desc }) => <div key={title} className="p-5 md:p-7 flex items-center gap-3"><Icon className="h-7 w-7 text-primary-600 shrink-0" strokeWidth={1.5} /><div><h3 className="font-bold text-sm text-stone-800">{title}</h3><p className="text-xs text-stone-500 mt-1">{desc}</p></div></div>)}
            </section>

            <section id="categories"><div className="flex items-end justify-between mb-8"><div><p className="brand-sans text-primary-600 text-xs font-bold mb-2">Find your everyday favourites</p><h2 className="text-3xl md:text-4xl font-black text-stone-800">Shop by Categories</h2></div><ArrowRight className="text-primary-600 h-6 w-6" /></div><div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">{categoryNames.map((name, index) => { const product = products[index % Math.max(products.length, 1)]; const categoryImage = featuredImages[index % featuredImages.length]; return <button key={name} onClick={() => setSearchTerm(name.split(' ')[0])} className="group text-left"><div className="aspect-square rounded-2xl bg-[#f7eee2] overflow-hidden p-3 mb-3 border border-transparent group-hover:border-primary-200 transition-all"><img src={getImageUrl(product?.image_path || categoryImage)} alt={name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500" onError={(e) => { e.currentTarget.src = getImageUrl(); }} /></div><p className="text-sm font-bold text-stone-700 group-hover:text-primary-600 transition-colors">{name}</p></button>; })}</div></section>

            <section id="products"><div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"><div><p className="brand-sans text-primary-600 text-xs font-bold mb-2">Chosen by our community</p><h2 className="text-3xl md:text-4xl font-black text-stone-800">Best Selling Products</h2></div><div className="flex items-center gap-4"><div className="relative"><Search className="absolute left-3 top-3 h-4 w-4 text-stone-400" /><input className="w-52 pl-9 pr-3 py-2.5 rounded-full border border-stone-200 text-sm outline-none focus:border-primary-500" placeholder="Search products" onChange={(e) => setSearchTerm(e.target.value)} /></div><span className="hidden md:block text-sm font-bold text-primary-600 whitespace-nowrap">View All Products <ArrowRight className="inline h-4 w-4" /></span></div></div>{filteredProducts.length > 0 ? <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">{filteredProducts.slice(0, 8).map(product => <ProductCard key={product._id} product={product} addToCart={handleAddToCart} />)}</div> : <div className="text-center py-24 bg-[#f7eee2] rounded-3xl"><Search className="mx-auto h-10 w-10 text-stone-400 mb-4" /><h3 className="text-xl font-bold text-stone-800">No products found</h3><p className="text-stone-500 mt-2">Try a different search term.</p></div>}</section>

            <section className="rounded-[2rem] overflow-hidden bg-[#722c25] text-white grid md:grid-cols-2 min-h-[330px]"><div className="p-9 md:p-14 flex flex-col justify-center"><p className="brand-sans text-primary-200 text-xs font-bold mb-4">Goodness, bundled together</p><h2 className="text-4xl md:text-5xl font-black">Combo Offers</h2><p className="mt-4 text-primary-100 text-lg">Save More with Our Special Combos</p><button onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} className="mt-8 w-fit bg-white text-primary-700 px-6 py-3 rounded-full font-bold hover:bg-primary-50 transition-colors">Shop Combos <ArrowRight className="inline ml-2 h-4 w-4" /></button></div><div className="bg-[#8f4b36] relative min-h-[260px]"><div className="absolute inset-0 leaf-pattern opacity-20" /><img src={getImageUrl(featuredImages[2])} alt="CurryLeaf cooker combo" className="absolute inset-0 w-full h-full object-cover p-10 float-product" onError={(e) => { e.currentTarget.src = getImageUrl(); }} /></div></section>

            <section className="grid md:grid-cols-2 gap-12 items-center"><div className="rounded-[2rem] bg-[#e6eee1] p-10 min-h-[280px] relative overflow-hidden"><Leaf className="absolute -right-8 -bottom-8 h-52 w-52 text-[#b8cbaa] rotate-12" strokeWidth={0.7} /><div className="relative"><p className="brand-sans text-[#50744b] text-xs font-bold mb-3">From our farms to your kitchen</p><h2 className="text-3xl md:text-4xl font-black text-stone-800">Why Choose<br /><span className="text-[#50744b]">CurryLeaf?</span></h2></div></div><div className="space-y-4">{['100% Natural & Pure', 'No Artificial Colors or Flavors', 'Sourced from Trusted Farms', 'Hygienically Packed', 'Loved by Thousands of Customers'].map(point => <div key={point} className="flex items-center gap-4 border-b border-stone-100 pb-4"><span className="h-6 w-6 rounded-full bg-[#e6eee1] text-[#50744b] flex items-center justify-center font-bold">✓</span><span className="font-bold text-stone-700">{point}</span></div>)}</div></section>
        </div>
    );
};

export default Home;
