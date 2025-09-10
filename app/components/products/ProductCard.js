// components/ProductCard.jsx
'use client';
import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Plus, Minus, ShoppingCart, Check, X } from 'lucide-react';
import { useCart } from '../CartContext';

const ProductCard = ({ product, categoryKey, pageIndex }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { addToCart, getItemCount } = useCart();

  // Reset component state when category or page changes
  useEffect(() => {
    setQuantity(1);
    setJustAdded(false);
    setIsAdding(false);
  }, [categoryKey, pageIndex, product.id]);

  const handleQuantityChange = useCallback((type) => {
    if (type === 'increment') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  }, [quantity]);

  const handleAddToCart = useCallback(() => {
    if (!product.originalPrice || product.originalPrice <= 0) {
      alert('Sorry, this product cannot be added to cart because it has no valid price.');
      return;
    }

    setIsAdding(true);
    
    const cartProduct = {
      id: product.id,
      title: product.title,
      image: product.image,
      discountedPrice: product.discountedPrice || product.originalPrice,
      originalPrice: product.originalPrice
    };

    const timeoutId = setTimeout(() => {
      addToCart(cartProduct, quantity);
      setIsAdding(false);
      setJustAdded(true);
      
      const successTimeoutId = setTimeout(() => {
        setJustAdded(false);
      }, 2000);

      return () => clearTimeout(successTimeoutId);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [product, quantity, addToCart]);

  // Get the actual cart count for THIS specific product
  const itemCount = getItemCount(product.id);
  
  const formatPrice = useCallback((price) => {
    if (!price || price <= 0) return null;
    return Math.floor(price).toLocaleString('en-IN');
  }, []);

  const displayedPrice = formatPrice(product.originalPrice);
  const canAddToCart = product.originalPrice && product.originalPrice > 0;

  return (
    <div className="bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden h-80 md:h-96 flex flex-col group w-full max-w-sm mx-auto rounded-xl">
      <div className="relative h-[75%] w-full overflow-hidden bg-gray-50 rounded-t-xl">
        <div className="relative w-full h-full">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
            quality={60}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+"
          />
        </div>
        
        {itemCount > 0 && (
          <div className="absolute top-3 right-3 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-md">
            {itemCount}
          </div>
        )}

        {!canAddToCart && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-md">
            Price N/A
          </div>
        )}
      </div>

      <div className="h-[25%] p-3 flex flex-col justify-between min-w-0 overflow-hidden rounded-b-xl">
        <div className="flex-1 flex items-end justify-center mb-2">
          <h3 className="text-sm md:text-base font-medium text-gray-900 leading-tight line-clamp-2 text-center" title={product.title}>
            {product.title}
          </h3>
        </div>

        <div className="flex items-center justify-between gap-1 min-w-0">
          <div className="flex flex-col flex-shrink-0">
            {displayedPrice ? (
              <span className="text-sm md:text-base font-bold text-black whitespace-nowrap">
                ₹{displayedPrice}
              </span>
            ) : (
              <span className="text-sm md:text-base font-medium text-gray-500 whitespace-nowrap">
                Price N/A
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 min-w-0 flex-shrink-0">
            {canAddToCart && (
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded flex-shrink-0">
                <button
                  onClick={() => handleQuantityChange('decrement')}
                  className="p-0.5 hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  disabled={quantity === 1 || isAdding}
                  type="button"
                >
                  <Minus className="w-2.5 h-2.5 text-gray-600" />
                </button>
                <span className="px-1.5 py-0.5 text-xs font-semibold text-gray-900 min-w-[20px] text-center border-l border-r border-gray-200">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange('increment')}
                  className="p-0.5 hover:bg-gray-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  disabled={isAdding}
                  type="button"
                >
                  <Plus className="w-2.5 h-2.5 text-gray-600" />
                </button>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              disabled={isAdding || !canAddToCart}
              type="button"
              className={`px-1.5 py-1 font-medium text-xs flex items-center justify-center transition-all duration-200 rounded w-12 flex-shrink-0 ${
                !canAddToCart
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-60'
                  : justAdded 
                  ? 'bg-emerald-600 text-white' 
                  : isAdding 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-center min-w-0">
                {!canAddToCart ? (
                  <X className="w-2.5 h-2.5 flex-shrink-0" />
                ) : isAdding ? (
                  <div className="animate-spin rounded-full h-2.5 w-2.5 border-2 border-current border-t-transparent opacity-60"></div>
                ) : justAdded ? (
                  <Check className="w-2.5 h-2.5 flex-shrink-0" />
                ) : (
                  <ShoppingCart className="w-2.5 h-2.5 flex-shrink-0" />
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
