import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';

const ProductCard = ({ product, addToCart }) => {
    return (
        <div className="group bg-white rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col h-full active:scale-[0.98]">
            <Link to={`/product/${product._id}`} className="relative aspect-[4/5] overflow-hidden bg-gray-50 flex items-center justify-center p-6">
                <img
                    src={product.image_path ? `/${product.image_path}` : 'https://via.placeholder.com/400?text=No+Image'}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                        const filename = product.image_path.split('/').pop();
                        e.target.src = `/uploads/${filename}`;
                    }}
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-gray-900 uppercase tracking-widest shadow-sm border border-gray-100">
                        {product.category}
                    </span>
                </div>
            </Link>
            
            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                    <h3 className="text-lg font-black text-gray-900 leading-tight mb-1 group-hover:text-primary-600 transition-colors line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{product.category}</p>
                </div>
                
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 font-bold">Price</span>
                        <span className="text-xl font-black text-gray-900 tracking-tight">${product.price?.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Link
                            to={`/product/${product._id}`}
                            className="p-3 bg-gray-50 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
                            title="View Details"
                        >
                            <Eye className="h-5 w-5" />
                        </Link>
                        <button
                            onClick={() => addToCart(product._id)}
                            className="p-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 shadow-lg shadow-primary-100 transition-all active:scale-90"
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
