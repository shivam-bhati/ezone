// components/WhatsAppCheckout.jsx
'use client';
import React, { useState } from 'react';
import { X, MessageCircle, Phone, MapPin, Send, ShoppingBag } from 'lucide-react';
import { useCart } from '../components/CartContext';

const WhatsAppCheckout = ({ isOpen, onClose }) => {
  const { cart, getCartTotal, clearCart } = useCart();
  const [orderData, setOrderData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    notes: ''
  });
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value
    });
  };

  const generateOrderId = () => {
    return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6).toUpperCase();
  };

  const sendWhatsAppMessage = (orderDetails) => {
    const itemsList = orderDetails.items.map(item => 
      `• ${item.title} x${item.quantity} - ₹${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');

    const message = `🛍️ *NEW ORDER FROM SHOPEASE* 🛍️

📋 *Order ID:* ${orderDetails.orderId}
📅 *Date:* ${new Date().toLocaleDateString('en-IN')}

👤 *CUSTOMER DETAILS:*
Name: ${orderDetails.customer.name}
Phone: ${orderDetails.customer.phone}
Address: ${orderDetails.customer.address}, ${orderDetails.customer.city} - ${orderDetails.customer.pincode}

📦 *ORDERED ITEMS:*
${itemsList}

💰 *TOTAL AMOUNT: ₹${orderDetails.totalAmount.toLocaleString()}*
💳 *Payment: Cash on Delivery*

${orderDetails.customer.notes ? `📝 *Special Instructions:*\n${orderDetails.customer.notes}` : ''}

Please confirm this order and provide delivery timeline. Thank you! 🙏`;
    
    const whatsappUrl = `https://wa.me/917428434147?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    
    const orderId = generateOrderId();
    const orderDetails = {
      orderId,
      customer: orderData,
      items: cart.items,
      totalAmount: getCartTotal(),
      orderDate: new Date().toISOString(),
      status: 'Pending WhatsApp Confirmation'
    };

    // Store order in localStorage for tracking
    try {
      const existingOrders = JSON.parse(localStorage.getItem('customer_orders') || '[]');
      existingOrders.push(orderDetails);
      localStorage.setItem('customer_orders', JSON.stringify(existingOrders));
    } catch (error) {
      console.error('Error saving order:', error);
    }

    // Send WhatsApp message
    sendWhatsAppMessage(orderDetails);

    // Show success and clear cart
    setOrderSubmitted(true);
    clearCart();

    // Close modal after 3 seconds
    setTimeout(() => {
      onClose();
      setOrderSubmitted(false);
      setOrderData({
        name: '', phone: '', address: '', city: '', pincode: '', notes: ''
      });
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {orderSubmitted ? (
          // Order Success Screen
          <div className="p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-green-600 mb-4">Order Sent via WhatsApp!</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <MessageCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">WhatsApp Message Sent</span>
              </div>
              <p className="text-sm text-green-700">
                Your order details have been sent via WhatsApp to our team.
              </p>
            </div>
            <div className="text-sm text-gray-600">
              <p className="mb-2">📱 <strong>Next Steps:</strong></p>
              <p className="mb-1">• Our team will review your order on WhatsApp</p>
              <p className="mb-1">• We'll confirm availability and delivery time</p>
              <p>• You'll receive order confirmation and tracking details</p>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-green-50">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-semibold">WhatsApp Checkout</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Info Banner */}
            <div className="bg-green-100 border-l-4 border-green-500 p-4">
              <div className="flex items-center">
                <MessageCircle className="w-5 h-5 text-green-600 mr-2" />
                <p className="text-sm text-green-800">
                  <strong>Free WhatsApp Ordering:</strong> Your order will be sent directly to our WhatsApp for instant confirmation!
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="p-6 border-b bg-gray-50">
              <h3 className="font-semibold mb-4 flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Order Summary
              </h3>
              <div className="space-y-2">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="flex-1">{item.title} x{item.quantity}</span>
                    <span className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total Amount:</span>
                  <span className="text-green-600">₹{getCartTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Customer Details Form */}
            <form onSubmit={handleSubmitOrder} className="p-6">
              <h3 className="font-semibold mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                Your Contact Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={orderData.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={orderData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Delivery Address *
                </label>
                <textarea
                  name="address"
                  value={orderData.address}
                  onChange={handleInputChange}
                  rows="3"
                  placeholder="Enter your complete address with landmarks"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={orderData.city}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={orderData.pincode}
                    onChange={handleInputChange}
                    placeholder="6-digit PIN code"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Special Instructions (Optional)
                </label>
                <textarea
                  name="notes"
                  value={orderData.notes}
                  onChange={handleInputChange}
                  rows="2"
                  placeholder="Any special requirements, preferred delivery time, etc."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Payment Method Info */}
              <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                  💰 Payment Method
                </h4>
                <p className="text-sm text-blue-700">
                  <strong>Cash on Delivery (COD)</strong><br/>
                  Pay in cash when your order is delivered to your address
                </p>
              </div>

              {/* WhatsApp Info */}
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-800 mb-2 flex items-center">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  How it Works
                </h4>
                <div className="text-sm text-green-700 space-y-1">
                  <p>✓ Click "Send Order via WhatsApp" below</p>
                  <p>✓ WhatsApp will open with your order details</p>
                  <p>✓ Send the message to our business number</p>
                  <p>✓ We'll confirm your order within 30 minutes</p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Send Order via WhatsApp</span>
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                🔒 Your information is secure and will only be used for order processing
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default WhatsAppCheckout;
