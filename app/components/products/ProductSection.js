// app/components/products/ProductSection.js
'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ProductCard from "../products/ProductCard";
import { categories } from "../products/ProductData";


// Constants
const CONSTANTS = {
  MOBILE_PRODUCTS_PER_PAGE: 2,
  DESKTOP_PRODUCTS_PER_PAGE: 4,
  RESIZE_DEBOUNCE_MS: 150,
  MOBILE_BREAKPOINT: 768
};

// Loading Spinner Component
const LoadingSpinner = () => (
  <svg 
    className="animate-spin h-5 w-5 md:h-6 md:w-6 text-white" 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle 
      className="opacity-25" 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="currentColor" 
      strokeWidth="4"
    />
    <path 
      className="opacity-75" 
      fill="currentColor" 
      d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const ProductSection = ({ initialCategory = 'cross' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [isNavigating, setIsNavigating] = useState(false);
  const [productsPerPage, setProductsPerPage] = useState(CONSTANTS.DESKTOP_PRODUCTS_PER_PAGE);
  const router = useRouter();

  // Memoize current products to prevent unnecessary recalculations
  const currentProducts = useMemo(() => {
    return categories[activeCategory]?.products || [];
  }, [activeCategory]);
  
  // Memoize the function to prevent recreating on every render
  const getProductsPerPage = useCallback(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < CONSTANTS.MOBILE_BREAKPOINT 
        ? CONSTANTS.MOBILE_PRODUCTS_PER_PAGE 
        : CONSTANTS.DESKTOP_PRODUCTS_PER_PAGE;
    }
    return CONSTANTS.DESKTOP_PRODUCTS_PER_PAGE;
  }, []);
  
  // Memoize total pages calculation
  const totalPages = useMemo(() => {
    return Math.ceil(currentProducts.length / productsPerPage);
  }, [currentProducts.length, productsPerPage]);

  // Optimized resize handler with proper cleanup and debouncing
  useEffect(() => {
    let timeoutId;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const newProductsPerPage = getProductsPerPage();
        if (newProductsPerPage !== productsPerPage) {
          setProductsPerPage(newProductsPerPage);
          setCurrentIndex(0);
        }
      }, CONSTANTS.RESIZE_DEBOUNCE_MS);
    };

    // Set initial value
    setProductsPerPage(getProductsPerPage());
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [getProductsPerPage, productsPerPage]);

  // Reset current index when total pages change
  useEffect(() => {
    if (currentIndex >= totalPages && totalPages > 0) {
      setCurrentIndex(totalPages - 1);
    }
  }, [totalPages, currentIndex]);

  // Navigation functions with useCallback to prevent recreations
  const nextSlide = useCallback(() => {
    if (!isNavigating) {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }
  }, [totalPages, isNavigating]);

  const prevSlide = useCallback(() => {
    if (!isNavigating) {
      setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
    }
  }, [totalPages, isNavigating]);

  const goToSlide = useCallback((index) => {
    if (!isNavigating && index >= 0 && index < totalPages) {
      setCurrentIndex(index);
    }
  }, [isNavigating, totalPages]);

  const handleCategoryChange = useCallback((categoryKey) => {
    if (!isNavigating && categories[categoryKey]) {
      setActiveCategory(categoryKey);
      setCurrentIndex(0);
    }
  }, [isNavigating]);

  // Improved navigation handling
  const handleViewAllProducts = useCallback(async () => {
    if (isNavigating) return;
    
    setIsNavigating(true);
    
    try {
      await router.push('/products');
    } catch (error) {
      console.error('Navigation error:', error);
      setIsNavigating(false);
    }
  }, [router, isNavigating]);

  // Memoize visible products to prevent unnecessary recalculations
  const visibleProducts = useMemo(() => {
    const startIndex = currentIndex * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return currentProducts.slice(startIndex, endIndex);
  }, [currentProducts, currentIndex, productsPerPage]);

  // Memoize category entries for performance
  const categoryEntries = useMemo(() => {
    return Object.entries(categories);
  }, []);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isNavigating) return;
      
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          prevSlide();
          break;
        case 'ArrowRight':
          event.preventDefault();
          nextSlide();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide, isNavigating]);

  return (
    <section className="bg-blue-500 py-8 md:py-16 w-full" id="products">
      <div className="w-full">
        {/* Section Header */}
        <header className="text-center mb-8 md:mb-12 px-4 max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">
            Corporate Gifting Collection
          </h2>
          <p className="text-blue-100 text-sm md:text-lg mb-2 md:mb-4">
            Discover premium branded products for corporate gifting
          </p>
          <div className="mt-2 md:mt-4">
            <span className="text-blue-100 text-xs md:text-sm">
              Premium Products Available Across All Categories
            </span>
          </div>
        </header>

        {/* Category Tabs */}
        <nav className="mb-6 md:mb-8 px-4 max-w-7xl mx-auto" aria-label="Product categories">
          <div className="flex overflow-x-auto scrollbar-hide gap-2 pb-2 md:flex-wrap md:justify-center md:overflow-visible md:pb-0">
            {categoryEntries.map(([key, category]) => (
              <button
                key={key}
                onClick={() => handleCategoryChange(key)}
                disabled={isNavigating}
                type="button"
                aria-pressed={activeCategory === key}
                className={`flex-shrink-0 px-3 py-1.5 md:px-4 md:py-2 font-medium transition-all duration-200 text-xs md:text-base whitespace-nowrap disabled:opacity-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500 ${
                  activeCategory === key
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'bg-blue-400 text-white hover:bg-blue-300'
                }`}
              >
                {category.name}
                <span className="ml-1 text-xs opacity-75">
                  ({category.products.length})
                </span>
              </button>
            ))}
          </div>
        </nav>

        {/* Product Grid */}
        <div className="relative w-full">
          {/* Navigation Buttons */}
          {totalPages > 1 && (
            <>
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0 || isNavigating}
                type="button"
                aria-label="Previous products"
                className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 p-2 md:p-3 rounded-full shadow-lg z-10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-gray-600" />
              </button>
              
              <button
                onClick={nextSlide}
                disabled={currentIndex === totalPages - 1 || isNavigating}
                type="button"
                aria-label="Next products"
                className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 p-2 md:p-3 rounded-full shadow-lg z-10 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-gray-600" />
              </button>
            </>
          )}

          {/* Products Grid */}
          <div className="px-4 md:px-16 max-w-7xl mx-auto">
            {visibleProducts.length > 0 ? (
              // Adjusted gap to create more space around products
              <div className="grid grid-cols-2 gap-6 md:gap-10">
                {visibleProducts.map((product) => (
                  <div key={product.id} className="w-full">
                    <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <ProductCard product={product} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-white text-lg">No products found in this category.</p>
              </div>
            )}
          </div>

          {/* Pagination Dots */}
          {totalPages > 1 && (
            <nav className="flex justify-center mt-6 md:mt-8 space-x-2" aria-label="Product pages">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isNavigating}
                  type="button"
                  aria-label={`Go to page ${index + 1}`}
                  aria-current={index === currentIndex ? 'page' : undefined}
                  className={`w-3 h-3 rounded-full transition-all duration-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-white ${
                    index === currentIndex 
                      ? 'bg-white scale-110 shadow-md' 
                      : 'bg-blue-300 hover:bg-blue-200 hover:scale-105'
                  }`}
                />
              ))}
            </nav>
          )}

          {/* Slide Counter */}
          {totalPages > 1 && (
            <div className="text-center mt-3 md:mt-4" aria-live="polite">
              <span className="text-blue-100 text-sm">
                Page {currentIndex + 1} of {totalPages}
              </span>
            </div>
          )}
        </div>

        {/* View All Products Button */}
        <div className="flex justify-center mt-12 md:mt-16">
          <button
            onClick={handleViewAllProducts}
            disabled={isNavigating}
            type="button"
            className={`group relative overflow-hidden font-bold py-4 px-8 md:py-5 md:px-12 rounded-lg shadow-xl transition-all duration-300 flex items-center space-x-3 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
              isNavigating 
                ? 'bg-gray-400 text-white cursor-not-allowed' 
                : 'bg-white text-blue-600 hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105'
            }`}
          >
            {!isNavigating && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg"></div>
            )}
            
            {isNavigating ? (
              <>
                <LoadingSpinner />
                <span className="relative z-10 text-lg md:text-xl">
                  Loading...
                </span>
              </>
            ) : (
              <>
                <span className="relative z-10 text-lg md:text-xl group-hover:text-white transition-colors duration-300">
                  View All Products
                </span>
                <ArrowRight className="relative z-10 w-5 h-5 md:w-6 md:h-6 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
              </>
            )}
            
            {!isNavigating && (
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-white blur-xl transition-opacity duration-300 rounded-lg"></div>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;