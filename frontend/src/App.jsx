import React from 'react';
import { Instagram, Facebook, Phone, Mail } from 'lucide-react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="min-h-screen bg-[#fffdf9] flex flex-col">
          <Navbar />
          <main className="flex-grow max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 w-full transition-all">
            <AppRoutes />
          </main>
          <footer className="bg-[#24221d] text-stone-200 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              <div><img src="/curryleaf-logo.jpeg" alt="CurryLeaf Essential" className="w-28 h-20 object-contain mix-blend-screen mb-3" /><p className="text-sm text-stone-400 leading-6">Pure, handpicked pantry essentials rooted in India's rich spice heritage.</p><div className="flex gap-3 mt-5"><Instagram className="h-4 w-4" /><Facebook className="h-4 w-4" /></div></div>
              <div><h3 className="brand-sans text-xs font-bold text-white mb-5">Quick Links</h3><div className="space-y-3 text-sm text-stone-400"><p>Shop All</p><p>Combo Offers</p><p>Our Story</p><p>Recipes &amp; Blog</p></div></div>
              <div><h3 className="brand-sans text-xs font-bold text-white mb-5">Customer Care</h3><div className="space-y-3 text-sm text-stone-400"><p>Shipping Policy</p><p>Returns &amp; Refunds</p><p>Privacy Policy</p><p>Terms &amp; Conditions</p></div></div>
              <div><h3 className="brand-sans text-xs font-bold text-white mb-5">Stay in the loop</h3><p className="text-sm text-stone-400 mb-4">Get 10% OFF on your first order.</p><div className="flex border border-stone-600 rounded-full overflow-hidden"><input className="bg-transparent px-4 py-3 text-sm outline-none min-w-0 w-full" placeholder="Your email address" /><button className="bg-primary-600 px-4 text-xs font-bold">JOIN</button></div><div className="flex items-center gap-3 mt-5 text-xs text-stone-400"><Phone className="h-3 w-3" /> +91 98765 43210 <Mail className="h-3 w-3 ml-2" /> hello@curryleaf.in</div></div>
            </div>
            <div className="border-t border-stone-700 py-5 text-center text-xs text-stone-500">© 2024 CurryLeaf Essential. Crafted with care in India.</div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
