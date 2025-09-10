// components/MinimalProductDuo.jsx
'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Plus, Minus, ShoppingCart, Check, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { categories } from '../components/products/ProductData';
import { useCart } from '../components/CartContext';

const MinimalProductDuo = () => {
  const [isClient, setIsClient] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const router = useRouter();

  // Get only Cross category products
  const crossProducts = useMemo(() => {
    return categories.cross?.products || [];
  }, []);

  // Use useEffect to handle random selection on client-side only
  useEffect(() => {
    setIsClient(true);
    if (crossProducts.length > 0) {
      const shuffled = [...crossProducts].sort(() => 0.5 - Math.random());
      setSelectedProducts(shuffled.slice(0, 2));
    }
  }, [crossProducts]);

  // Navigation handler
  const handleViewAllProducts = useCallback(() => {
    router.push('/products');
  }, [router]);

  // Individual Product Card Component
  const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const [justAdded, setJustAdded] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    
    const { addToCart, getItemCount } = useCart();

    const handleQuantityChange = useCallback((type) => {
      if (type === 'increment') {
        setQuantity(prev => prev + 1);
      } else if (type === 'decrement' && quantity > 1) {
        setQuantity(prev => prev - 1);
      }
    }, [quantity]);

    const handleAddToCart = useCallback(() => {
      if (isAdding) return;
      
      setIsAdding(true);
      
      try {
        // Create cart product object
        const cartProduct = {
          id: product.id,
          title: product.title,
          image: product.image,
          originalPrice: product.originalPrice,
          discountedPrice: product.discountedPrice || product.originalPrice
        };

        console.log('Adding to cart:', cartProduct, 'Quantity:', quantity);
        
        // Add to cart
        addToCart(cartProduct, quantity);
        
        // Show success state
        setJustAdded(true);
        
        // Reset states after delay
        setTimeout(() => {
          setJustAdded(false);
          setIsAdding(false);
        }, 2000);
        
      } catch (error) {
        console.error('Error adding to cart:', error);
        setIsAdding(false);
      }
    }, [product, quantity, addToCart, isAdding]);

    const formatPrice = useCallback((price) => {
      if (price === undefined || price === null || isNaN(price)) return '0';
      return Math.floor(price).toLocaleString('en-IN');
    }, []);

    const itemCount = getItemCount(product.id);

    return (
      <div className="group relative bg-gradient-to-br from-amber-50/80 via-yellow-50/60 to-orange-50/80 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 hover:scale-105 overflow-hidden border border-amber-200/40 backdrop-blur-sm h-full">
        
        {/* Image Section - 60% height for more content space */}
        <div className="relative h-[60%] md:h-[65%] overflow-hidden rounded-t-3xl bg-gradient-to-br from-gray-50 to-gray-100">
          {/* Image Container */}
          <div className="relative w-full h-full p-3 md:p-4">
            {!imageError ? (
              <Image
                src={product.image}
                alt={product.title}
                fill
                className={`object-contain transition-all duration-700 group-hover:scale-110 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                sizes="(max-width: 768px) 50vw, 33vw"
                quality={90}
                priority
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  console.error('Failed to load image:', product.image);
                  setImageError(true);
                }}
              />
            ) : (
              // Fallback content
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-yellow-100 rounded-xl">
                <div className="text-center p-4">
                  <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 bg-amber-200 rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 md:w-8 md:h-8 text-amber-600" />
                  </div>
                  <p className="text-amber-800 font-semibold text-xs md:text-sm">Product Image</p>
                  <p className="text-amber-600 text-xs mt-1">#{product.id}</p>
                </div>
              </div>
            )}
            
            {/* Loading spinner */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 md:w-8 md:h-8 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
          
          {/* Cart Count Badge */}
          {itemCount > 0 && (
            <div className="absolute top-3 right-3 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
              {itemCount}
            </div>
          )}
          
          {/* Floating Golden Accents */}
          <div className="absolute top-3 left-3 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full shadow-lg opacity-70 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500 z-20" />
          <div className="absolute bottom-3 right-3 w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-md opacity-50 group-hover:opacity-80 group-hover:scale-125 transition-all duration-700 z-20" />
          
          {/* Success Badge */}
          {justAdded && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white px-3 py-2 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold shadow-xl z-30 animate-bounce">
              ✓ Added!
            </div>
          )}
        </div>

        {/* Content Section - 40% height with better spacing */}
        <div className="h-[40%] md:h-[35%] px-3 md:px-4 py-3 md:py-4 bg-gradient-to-r from-amber-100/90 via-yellow-100/70 to-orange-100/90 backdrop-blur-lg border-t border-amber-200/50 flex flex-col justify-between">
          
          {/* Title and Price Section */}
          <div className="flex-1 flex flex-col justify-start mb-3 min-h-0">
            <h3 className="text-sm md:text-base lg:text-lg font-bold text-amber-900 leading-tight mb-2 group-hover:text-amber-800 transition-colors line-clamp-2">
              {product.title}
            </h3>
            <p className="text-base md:text-lg lg:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-yellow-700">
              ₹{formatPrice(product.originalPrice)}
            </p>
          </div>

          {/* Controls Section - Fixed at bottom with proper sizing */}
          <div className="flex items-center justify-between gap-2 flex-shrink-0 min-h-[36px]">
            
            {/* Left side spacer */}
            <div className="w-2"></div>
            
            {/* Right Side: Quantity & Add to Cart - Mobile Optimized */}
            <div className="flex items-center gap-2 flex-shrink-0">
              
              {/* Quantity Controls - Smaller for mobile */}
              <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full border border-amber-300/60 shadow-sm">
                <button
                  onClick={() => handleQuantityChange('decrement')}
                  disabled={quantity === 1 || isAdding}
                  className="p-1.5 md:p-2 hover:bg-amber-100/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-l-full touch-manipulation"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3 h-3 md:w-4 md:h-4 text-amber-700" />
                </button>
                
                <div className="px-2 md:px-3 py-1.5 md:py-2 border-l border-r border-amber-300/40 min-w-[28px] md:min-w-[32px]">
                  <span className="text-sm md:text-base font-bold text-amber-900 text-center block">
                    {quantity}
                  </span>
                </div>
                
                <button
                  onClick={() => handleQuantityChange('increment')}
                  disabled={isAdding}
                  className="p-1.5 md:p-2 hover:bg-amber-100/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-r-full touch-manipulation"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3 h-3 md:w-4 md:h-4 text-amber-700" />
                </button>
              </div>

              {/* Add to Cart Button - Always visible */}
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`px-3 py-2 md:px-4 md:py-2.5 rounded-full font-bold text-xs md:text-sm transition-all duration-300 transform hover:scale-105 disabled:cursor-not-allowed flex items-center gap-1 shadow-md hover:shadow-lg touch-manipulation min-w-[70px] md:min-w-[90px] justify-center ${
                  justAdded
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white'
                    : isAdding
                    ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white opacity-70'
                    : 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white'
                }`}
              >
                {isAdding ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span className="hidden sm:inline">Adding</span>
                  </>
                ) : justAdded ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-3 h-3" />
                    <span>Add</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Hover Border Glow Effect */}
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-400 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none -z-10" />
      </div>
    );
  };

  // Loading state during hydration
  if (!isClient) {
    return (
      <section className="relative py-16 bg-gradient-to-br from-amber-25 via-yellow-25 to-orange-25 min-h-screen overflow-hidden">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-amber-600 text-lg">Loading Products...</p>
          </div>
        </div>
      </section>
    );
  }

  // Empty state if no products
  if (selectedProducts.length === 0) {
    return (
      <section className="relative py-16 bg-gradient-to-br from-amber-25 via-yellow-25 to-orange-25 min-h-screen overflow-hidden">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-amber-600 text-lg mb-4">No products available</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-8 md:py-16 bg-gradient-to-br from-amber-25 via-yellow-25 to-orange-25 min-h-screen overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-amber-200/20 to-yellow-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-32 w-40 h-40 bg-gradient-to-r from-yellow-200/20 to-orange-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-orange-200/20 to-amber-200/20 rounded-full blur-2xl animate-ping" />
      </div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-16">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 mb-4 md:mb-6 tracking-tight">
            Premium Collection
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-amber-800/80 font-medium max-w-2xl mx-auto leading-relaxed px-4">
            Premium products for sophisticated corporate gifting
          </p>
          
          <div className="mt-6 md:mt-8 flex justify-center">
            <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full" />
          </div>
        </div>

        {/* Product Grid - Single column on mobile with vertical spacing, 2 columns on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-3 md:gap-x-6 lg:gap-8 max-w-4xl mx-auto">
          {selectedProducts.map((product) => (
            <div key={product.id} className="aspect-[3/4] min-h-[300px] md:min-h-[360px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* View All Products Button */}
        <div className="flex justify-center mt-12 md:mt-16">
          <button
            onClick={handleViewAllProducts}
            type="button"
            className="group relative overflow-hidden px-8 py-4 md:px-12 md:py-5 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-bold text-lg md:text-xl rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
          >
            <span className="relative z-10">View All Products</span>
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
          </button>
        </div>

        {/* Bottom Decorative Elements */}
        <div className="mt-12 md:mt-20 flex justify-center space-x-3 md:space-x-4">
          <div className="w-2 h-2 md:w-3 md:h-3 bg-amber-400 rounded-full opacity-60 animate-bounce" />
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-yellow-500 rounded-full opacity-40 animate-bounce delay-200" />
          <div className="w-3 h-3 md:w-4 md:h-4 bg-orange-400 rounded-full opacity-50 animate-bounce delay-400" />
        </div>
      </div>
    </section>
  );
};

export default MinimalProductDuo;
