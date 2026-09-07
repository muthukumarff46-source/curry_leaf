import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';

const ProductCard = ({ product, addToCart }) => {
    return (
        <div className="group bg-white rounded-2xl shadow-[0_5px_24px_rgba(75,38,22,0.06)] hover:shadow-[0_15px_35px_rgba(75,38,22,0.12)] transition-all duration-500 overflow-hidden border border-stone-100 flex flex-col h-full">
            <Link to={`/product/${product._id}`} className="relative aspect-square overflow-hidden bg-[#f7eee2] flex items-center justify-center p-5">
                <img
                    src={product.image_path ? `/${product.image_path}` : '/curryleaf-logo.jpeg'}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                        const filename = product.image_path.split('/').pop();
                        e.target.src = `/uploads/${filename}`;
                    }}
                />
                <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-bold text-primary-700 uppercase tracking-wider shadow-sm">
                        {product.category}
                    </span>
                </div>
                    <button type="button" onClick={(e) => e.preventDefault()} className="absolute top-3 right-3 p-2 bg-white rounded-full text-stone-400 hover:text-primary-600 transition-colors" title="Add to wishlist"><Heart className="h-4 w-4" /></button>
            </Link>
            
            <div className="p-4 md:p-5 flex flex-col flex-grow">
                <div className="mb-3">
                    <h3 className="text-base md:text-lg font-black text-stone-800 leading-tight mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">{product.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-stone-500"><Star className="h-3 w-3 fill-[#c99b3b] text-[#c99b3b]" /> 4.8 <span className="text-stone-400">(24 reviews)</span></div>
                </div>
                
                <div className="mt-auto flex items-end justify-between pt-3 border-t border-stone-100">
                    <div className="flex flex-col">
                        <span className="text-xs text-stone-400 font-bold">Starting at</span>
                        <span className="text-xl font-black text-stone-800 tracking-tight">₹{product.price?.toFixed(0)}</span>
                    </div>
                    <div>
                        <button
                            onClick={() => addToCart(product._id)}
                            className="p-2.5 bg-primary-600 text-white rounded-full hover:bg-primary-700 shadow-lg shadow-primary-100 transition-all active:scale-90"
                            title="Add to Cart"
                        >
                            <ShoppingCart className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
