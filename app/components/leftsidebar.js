// components/LeftSidebar.jsx
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, ChevronRight } from 'lucide-react';
import { categories } from './products/ProductData';

const LeftSidebar = ({ isOpen, onClose, logoSrc }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const sidebarRef = useRef(null);

  // Handle click outside to close sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && isOpen) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Handle escape key to close sidebar
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isOpen, onClose]);

  const toggleCategory = (categoryKey) => {
    setExpandedCategory(expandedCategory === categoryKey ? null : categoryKey);
  };

  const handleCategoryHover = (categoryKey) => {
    setExpandedCategory(categoryKey);
  };

  const handleCategoryLeave = () => {
    setExpandedCategory(null);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40" 
          onClick={onClose} 
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-white shadow-2xl z-50 w-80 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="flex items-center">
            {logoSrc ? (
              <img 
                src={logoSrc} 
                alt="Company Logo" 
                className="h-14 w-auto object-contain max-w-[220px]"
              />
            ) : (
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-14 h-14 bg-gray-200 border-2 border-dashed border-gray-400 rounded-lg">
                  <span className="text-xs text-gray-500 text-center">Logo</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-indigo-600">GiftingPro</h2>
                  <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                    Corporate
                  </span>
                </div>
              </div>
            )}
          </div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Categories Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Product Categories</h2>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {Object.keys(categories).length} categories
              </span>
            </div>
            
            <div className="space-y-2">
              {Object.entries(categories).map(([categoryKey, category]) => (
                <div 
                  key={categoryKey}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => toggleCategory(categoryKey)}
                    onMouseEnter={() => handleCategoryHover(categoryKey)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-indigo-50 transition-colors group"
                  >
                    <div className="flex-1">
                      <span className="font-semibold text-gray-900 group-hover:text-indigo-600">
                        {category.name}
                      </span>
                      <div className="text-xs text-gray-500 mt-1 flex items-center space-x-3">
                        <span>{category.products.length} products</span>
                        <span className="text-green-600 font-medium">
                          ₹{Math.min(...category.products.map(p => p.originalPrice)).toLocaleString()} - 
                          ₹{Math.max(...category.products.map(p => p.originalPrice)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    {expandedCategory === categoryKey ? (
                      <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-indigo-600" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600" />
                    )}
                  </button>

                  {/* Expanded Category Content */}
                  {expandedCategory === categoryKey && (
                    <div className="bg-gradient-to-br from-gray-50 to-indigo-50 border-t border-gray-200">
                      <div className="p-4 space-y-4">
                        {/* Category Description */}
                        <div className="bg-white rounded-lg p-3 border border-indigo-100">
                          <h4 className="font-medium text-indigo-800 mb-1 text-sm">
                            {category.name} Collection
                          </h4>
                          <p className="text-xs text-gray-600">
                            Premium {category.name.toLowerCase()} products perfect for corporate gifting
                          </p>
                        </div>

                        {/* Popular Products */}
                        <div>
                          <h4 className="font-medium text-gray-800 mb-3 text-sm flex items-center">
                            Popular Products
                            <span className="ml-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                              Top {Math.min(8, category.products.length)}
                            </span>
                          </h4>
                          <div className="space-y-2 max-h-64 overflow-y-auto">
                            {category.products.slice(0, 8).map((product, index) => (
                              <a
                                key={index}
                                href="/products"
                                className="block text-sm text-gray-600 hover:text-indigo-600 hover:bg-white p-3 rounded-lg transition-all group border border-transparent hover:border-indigo-200"
                              >
                                <div className="flex justify-between items-start">
                                  <div className="flex-1 pr-2">
                                    <span className="font-medium group-hover:text-indigo-600 line-clamp-2">
                                      {product.title}
                                    </span>
                                    {product.colors && product.colors.length > 0 && (
                                      <div className="text-xs text-gray-500 mt-1">
                                        {product.colors.length} colors available
                                      </div>
                                    )}
                                  </div>
                                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                                    ₹{product.originalPrice.toLocaleString()}
                                  </span>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-3 border-t border-gray-200">
                          <div className="space-y-2">
                            <a
                              href="/products"
                              className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white text-center py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                            >
                              View All {category.name}
                            </a>
                            <a
                              href="/products"
                              className="block w-full border border-indigo-600 text-indigo-600 hover:bg-indigo-50 text-center py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                            >
                              Browse Collection
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer Section */}
          <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-indigo-50">
            <div className="text-center text-xs text-gray-600 space-y-2">
              <div>
                <p className="font-medium">Need help with bulk orders?</p>
                <p className="text-indigo-600 font-semibold">corporate@giftingpro.com</p>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <p className="text-gray-500">Free delivery for corporate orders</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
