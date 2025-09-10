// components/Navbar.jsx
'use client';
import React, { useState } from 'react';
import Link from 'next/link'; // Import Next.js Link component
import { 
  ShoppingCart, 
  Menu, 
  X, 
  User,
  Heart,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { useCart } from '../components/CartContext';
import CartSidebar from '../components/CartSidebar';
import LeftSidebar from '../components/leftsidebar';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { cart, getTotalItems } = useCart();

  // Use your logo from public folder
  const logoSrc = "/logo1.png";

  const navItems = [
    { name: 'Home', href: '/' }, // Updated to use '/' for home
    { name: 'About', href: '#about' },
    { name: 'Products', href: '/products' },
    { name: 'Contact', href: '#contact' }
  ];

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const closeCart = () => setIsCartOpen(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const totalCartItems = getTotalItems();

  return (
    <>
      {/* Top Bar */}
      <div className="bg-indigo-800 text-white py-2 hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="w-4 h-4" />
                <span>corporate@giftingpro.com</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>Free delivery for bulk orders</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="hover:text-indigo-300 transition-colors">Track Order</button>
              <button className="hover:text-indigo-300 transition-colors">Corporate Solutions</button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Left Side - Menu Button and Logo */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors p-2 hover:bg-gray-100 rounded-lg border border-gray-200 hover:border-indigo-200"
              >
                <Menu className="w-5 h-5" />
                <span className="hidden sm:inline text-sm font-medium">Categories</span>
              </button>

              {/* Logo - Clickable link to home page */}
              <div className="flex items-center py-2">
                {logoSrc ? (
                  <Link 
                    href="/" 
                    className="flex items-center hover:opacity-80 transition-opacity duration-200"
                  >
                    <img 
                      src={logoSrc} 
                      alt="Company Logo - Go to Home" 
                      className="h-12 sm:h-14 md:h-16 w-auto object-contain max-w-[200px] sm:max-w-[250px] md:max-w-[300px] cursor-pointer"
                    />
                  </Link>
                ) : (
                  // Enhanced fallback design with home link
                  <Link 
                    href="/" 
                    className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
                  >
                    <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-lg shadow-md">
                      <span className="text-lg md:text-xl font-bold">GP</span>
                    </div>
                    <div>
                      <h1 className="text-xl md:text-2xl font-bold text-indigo-600">GiftingPro</h1>
                      <span className="text-sm bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
                        Corporate
                      </span>
                    </div>
                  </Link>
                )}
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-3 md:space-x-4">
              <button className="hidden lg:flex items-center space-x-1 text-gray-700 hover:text-indigo-600 transition-colors p-2 rounded-lg hover:bg-gray-50">
                <User className="w-5 h-5" />
                <span className="text-sm">Account</span>
              </button>

              <button className="hidden lg:flex items-center space-x-1 text-gray-700 hover:text-indigo-600 transition-colors p-2 rounded-lg hover:bg-gray-50">
                <Heart className="w-5 h-5" />
                <span className="text-sm">Wishlist</span>
              </button>

              <button 
                onClick={toggleCart}
                className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg transition-colors relative"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden sm:inline text-sm">Cart</span>
                <span className="text-sm">({totalCartItems})</span>
                {totalCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {totalCartItems}
                  </span>
                )}
              </button>

              <button
                onClick={toggleMenu}
                className="lg:hidden text-gray-700 hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-50"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden border-t bg-white transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 py-4 space-y-3">
            <div className="flex items-center justify-around pb-3 border-b border-gray-100">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors p-2 rounded-lg hover:bg-gray-50">
                <User className="w-5 h-5" />
                <span>Account</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors p-2 rounded-lg hover:bg-gray-50">
                <Heart className="w-5 h-5" />
                <span>Wishlist</span>
              </button>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMenu}
                className="block py-3 px-2 text-gray-800 font-medium hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                {item.name}
              </Link>
            ))}

            <div className="pt-3 border-t border-gray-100">
              <button
                onClick={() => {
                  toggleSidebar();
                  closeMenu();
                }}
                className="w-full flex items-center space-x-2 bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Menu className="w-5 h-5" />
                <span className="font-medium">Browse Categories</span>
              </button>
            </div>

            <div className="pt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
              <button className="text-left py-2 px-3 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors">
                Track Order
              </button>
              <button className="text-left py-2 px-3 text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors">
                Corporate Solutions
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={closeMenu}
        />
      )}

      <LeftSidebar 
        isOpen={isSidebarOpen} 
        onClose={closeSidebar} 
        logoSrc={logoSrc}
      />

      <CartSidebar isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
};

export default Navbar;
