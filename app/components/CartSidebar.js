// components/CartSidebar.jsx
'use client';
import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, RotateCcw, MessageCircle } from 'lucide-react';
import { useCart } from '../components/CartContext';
import WhatsAppCheckout from './WhatsAppCheckout';

const CartSidebar = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleQuantityChange = (itemId, currentQuantity, type) => {
    if (type === 'increment') {
      updateQuantity(itemId, currentQuantity + 1);
    } else if (type === 'decrement') {
      updateQuantity(itemId, currentQuantity - 1);
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  const openWhatsAppCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const closeWhatsAppCheckout = () => {
    setIsCheckoutOpen(false);
  };

  return (
    <>
      {/* Backdrop - only visible when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 right-0 h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        w-full sm:w-96 max-w-md
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5" />
              <h2 className="text-lg font-semibold">
                Cart ({cart.totalItems})
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              {cart.items.length > 0 && (
                <button
                  onClick={handleClearCart}
                  className="p-2 hover:bg-blue-700 rounded-full transition-colors"
                  title="Clear Cart"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-blue-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {cart.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
                <div className="text-6xl mb-4">🛒</div>
                <p className="text-lg font-medium text-center">Your cart is empty</p>
                <p className="text-sm text-center mt-2">Add some products to get started!</p>
                <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 w-full">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-800">WhatsApp Ordering</span>
                  </div>
                  <p className="text-xs text-center text-green-700">
                    Orders are sent directly via WhatsApp for instant confirmation!
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {/* Cart persistence indicator */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-700 font-medium">
                      Cart automatically saved
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <MessageCircle className="w-3 h-3 text-green-600" />
                    <p className="text-xs text-green-600">
                      Ready for WhatsApp checkout
                    </p>
                  </div>
                </div>

                {cart.items.map((item) => (
                  <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                    <div className="flex space-x-3">
                      {/* Product Image */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md flex-shrink-0"
                      />
                      
                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-lg font-bold text-blue-600 mt-1">
                          ₹{item.price.toLocaleString()}
                        </p>
                        
                        {/* Quantity and Remove Controls */}
                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity, 'decrement')}
                              className="p-1 hover:bg-gray-100 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 py-1 text-sm font-medium min-w-[40px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity, 'increment')}
                              className="p-1 hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          
                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Item Total */}
                        <div className="mt-2 text-right">
                          <span className="text-sm text-gray-600">Total: </span>
                          <span className="font-medium text-gray-800">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer with Total and WhatsApp Checkout */}
          {cart.items.length > 0 && (
            <div className="border-t bg-gray-50 p-4">
              <div className="space-y-4">
                {/* Total Amount */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-800">Total Amount:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ₹{getCartTotal().toLocaleString()}
                  </span>
                </div>
                
                {/* WhatsApp Info Banner */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-1">
                    <MessageCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">WhatsApp Ordering</span>
                  </div>
                  <p className="text-xs text-green-700">
                    Send your order instantly via WhatsApp • No payment required upfront
                  </p>
                </div>
                
                {/* Action Buttons */}
                <div className="space-y-2">
                  <button 
                    onClick={openWhatsAppCheckout}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Order via WhatsApp</span>
                  </button>
                  <button 
                    onClick={onClose}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
                
                {/* Payment Info */}
                <div className="text-center text-xs text-gray-600 bg-blue-50 rounded-lg p-2 flex items-center justify-center space-x-1">
                  <span>💰</span>
                  <span>Cash on Delivery Available • FREE WhatsApp Ordering</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* WhatsApp Checkout Modal */}
      <WhatsAppCheckout 
        isOpen={isCheckoutOpen} 
        onClose={closeWhatsAppCheckout} 
      />
    </>
  );
};

export default CartSidebar;
