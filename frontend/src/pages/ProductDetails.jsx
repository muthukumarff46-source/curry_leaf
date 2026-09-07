import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productApi } from '../api/productApi';
import { cartApi } from '../api/cartApi';
import { ShoppingCart, ArrowLeft, Loader2, Package, Heart, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getImageUrl } from '../utils/imageUrl';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);
    const { user, isAdmin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await productApi.getOne(id);
                setProduct(data);
            } catch (error) {
                console.error('Failed to fetch product', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (isAdmin) return;

        setAdding(true);
        try {
            await cartApi.addItem({ product_id: id, quantity });
            window.dispatchEvent(new Event('cart-updated'));
            alert('Added to cart!');
        } catch (error) {
            alert('Failed to add to cart');
        } finally {
            setAdding(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 text-primary-600 animate-spin" />
        </div>
    );

    if (!product) return <div className="text-center py-10">Product not found</div>;

    return (
        <div className="max-w-6xl mx-auto space-y-8 fade-up">
            <button 
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-500 hover:text-primary-600 font-bold transition-colors group"
            >
                <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Collection
            </button>

            <div className="bg-white rounded-[2rem] shadow-xl shadow-stone-200/50 border border-stone-100 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-12">
                    {/* Image Section */}
                    <div className="bg-[#f7eee2] p-8 md:p-12 flex items-center justify-center border-r border-stone-100">
                        <div className="relative group w-full aspect-square max-w-md">
                            <img
                                src={getImageUrl(product.image_path)}
                                alt={product.name}
                                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                                onError={(e) => { e.currentTarget.src = getImageUrl(); }}
                            />
                            <div className="absolute top-4 right-4">
                                <span className="bg-white/80 backdrop-blur px-4 py-1.5 rounded-full text-xs font-black text-gray-900 uppercase tracking-widest shadow-sm border border-gray-100">
                                    {product.category}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black text-stone-800 tracking-tight leading-tight mb-4">
                                    {product.name}
                                </h1>
                                <div className="flex items-center space-x-4">
                                    <span className="text-4xl font-black text-primary-600">
                                        ₹{product.price?.toFixed(0)}
                                    </span>
                                    <span className="text-sm text-stone-400 line-through">MRP ₹{(product.price * 1.2)?.toFixed(0)}</span>
                                    {product.stock_quantity > 0 ? (
                                        <span className="inline-flex items-center text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg">
                                            <div className="h-1.5 w-1.5 rounded-full bg-green-600 mr-2 animate-pulse" />
                                            {product.stock_quantity} in stock
                                        </span>
                                    ) : (
                                        <span className="text-sm font-bold text-red-600 bg-red-50 px-3 py-1 rounded-lg">Out of stock</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-stone-600"><span className="flex items-center bg-[#c99b3b] text-white px-2 py-1 rounded"><Star className="h-3 w-3 fill-white mr-1" /> 4.8</span> 24 verified reviews</div>
                            <div className="prose prose-sm text-stone-500 max-w-none">
                                <p className="leading-relaxed text-lg font-medium">
                                    {product.description}
                                </p>
                            </div>

                            <div className="pt-6 border-t border-stone-100 space-y-4">
                                <div><p className="brand-sans text-[10px] font-bold text-stone-500 mb-2">Choose weight</p><div className="flex gap-2"><button className="border-2 border-primary-600 text-primary-700 px-4 py-2 rounded-lg text-sm font-bold">200g</button><button className="border border-stone-200 text-stone-600 px-4 py-2 rounded-lg text-sm font-bold">500g</button><button className="border border-stone-200 text-stone-600 px-4 py-2 rounded-lg text-sm font-bold">1kg</button></div></div>
                                <div className="flex items-center space-x-4">
                                    {!isAdmin && product.stock_quantity > 0 && (
                                        <div className="flex items-center border border-gray-200 rounded-2xl bg-gray-50 p-1">
                                            <button 
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="w-10 h-10 flex items-center justify-center font-bold text-gray-600 hover:text-primary-600 transition-colors"
                                            >
                                                -
                                            </button>
                                            <span className="w-12 text-center font-black text-gray-900">{quantity}</span>
                                            <button 
                                                onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                                                className="w-10 h-10 flex items-center justify-center font-bold text-gray-600 hover:text-primary-600 transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>
                                    )}
                                    <button
                                        disabled={adding || product.stock_quantity === 0 || isAdmin}
                                        onClick={handleAddToCart}
                                        className="flex-grow flex items-center justify-center bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white py-4 px-8 rounded-xl font-black text-lg shadow-xl shadow-primary-100 transition-all active:scale-[0.98] group"
                                    >
                                        {adding ? <Loader2 className="h-6 w-6 animate-spin text-white" /> : (
                                            <>
                                                <ShoppingCart className="h-6 w-6 mr-3 group-hover:rotate-12 transition-transform" />
                                                Add to Cart
                                            </>
                                        )}
                                    </button>
                                </div>
                                <div className="flex items-center justify-center gap-3"><button className="p-3 border border-stone-200 rounded-xl text-stone-500 hover:text-primary-600" title="Add to wishlist"><Heart className="h-5 w-5" /></button><button onClick={handleAddToCart} className="flex-1 border border-primary-600 text-primary-700 py-3 rounded-xl font-bold">Buy Now</button></div><p className="text-xs text-stone-400 font-bold text-center">Secure checkout &amp; free shipping above ₹499</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { icon: Package, title: 'Secure Delivery', desc: 'Carefully handled' },
                    { icon: ShoppingCart, title: 'Premium Support', desc: '24/7 dedicated' },
                    { icon: ArrowLeft, title: 'Easy Returns', desc: '30-day window' }
                ].map((f, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 flex items-center space-x-4 shadow-sm">
                        <div className="p-3 bg-primary-100 rounded-2xl text-primary-600">
                            <f.icon className="h-6 w-6" />
                        </div>
                        <div>
                            <h4 className="font-black text-gray-900">{f.title}</h4>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{f.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductDetails;
