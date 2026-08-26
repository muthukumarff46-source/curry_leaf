import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 w-full transition-all">
            <AppRoutes />
          </main>
          <footer className="bg-white border-t border-gray-100 py-6 text-center text-gray-500 text-sm">
             <p>&copy; 2024 Mini E-commerce. Premium Experience.</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
