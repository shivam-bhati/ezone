// app/products/page.js
'use client';
import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, X, Grid, List, ShoppingCart, ArrowRight, Plus, Minus } from 'lucide-react';
import { categories } from '../components/products/ProductData';
import { useCart } from '../components/CartContext';
import CartSidebar from '../components/CartSidebar';

// Floating Cart Button Component
const CartButton = ({ onClick }) => {
  const { cart, getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <button
      onClick={onClick}
      className="fixed top-20 right-6 bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition-all duration-300 z-50 flex items-center space-x-2"
    >
      <ShoppingCart className="w-6 h-6" />
      {totalItems > 0 && (
        <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold absolute -top-2 -right-2">
          {totalItems}
        </span>
      )}
      <span className="hidden md:inline-block font-semibold">Cart</span>
    </button>
  );
};

// Enhanced Product Card with Quantity Controls
const ProductCard = ({ product, viewMode }) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { addToCart, getItemCount } = useCart();

  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    
    const cartProduct = {
      id: product.id,
      title: product.title,
      image: product.image,
      discountedPrice: product.originalPrice,
      originalPrice: product.originalPrice
    };
    
    setTimeout(() => {
      addToCart(cartProduct, quantity);
      setIsAdding(false);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    }, 500);
  };

  const itemInCart = getItemCount(product.id);

  // Fixed price formatting - only show if price exists and > 0
  const formatPrice = (price) => {
    if (price === undefined || price === null || price <= 0) {
      return null;
    }
    return Math.floor(price).toLocaleString('en-IN');
  };

  const formattedPrice = formatPrice(product.originalPrice);

  // LIST VIEW
  if (viewMode === 'list') {
    return (
      <div className="bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300 group max-w-5xl mx-auto">
        <div className="flex">
          <div className="w-72 h-72 bg-gray-50 flex-shrink-0 relative overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {itemInCart > 0 && (
              <div className="absolute top-3 right-3 bg-emerald-500 text-white px-3 py-2 text-sm font-bold">
                {itemInCart} IN CART
              </div>
            )}
          </div>
          <div className="flex-1 p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-gray-600 transition-colors">
                {product.title}
              </h3>
              <div className="text-base text-gray-600 mb-4">
                {product.colors && product.colors.length > 0 ? (
                  <span>{product.colors.length} Colors Available</span>
                ) : (
                  <span>Standard Product</span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {formattedPrice && (
                  <span className="text-3xl font-bold text-indigo-600">₹{formattedPrice}</span>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => handleQuantityChange('decrement')}
                    className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                    disabled={quantity === 1 || isAdding}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-semibold border-x border-gray-300 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange('increment')}
                    className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                    disabled={isAdding}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className={`px-8 py-3 text-lg font-medium flex items-center space-x-2 transition-colors ${
                    justAdded 
                      ? 'bg-emerald-600 text-white' 
                      : isAdding 
                      ? 'bg-gray-400 text-white cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {isAdding ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Adding...</span>
                    </>
                  ) : justAdded ? (
                    <span>Added!</span>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // GRID VIEW - Fixed layout with proper button alignment
  return (
    <div className="bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-[550px] flex flex-col max-w-lg mx-auto">
      <div className="relative h-[60%] w-full overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
        {itemInCart > 0 && (
          <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-2 text-sm font-bold rounded">
            {itemInCart} IN CART
          </div>
        )}
        {product.colors && product.colors.length > 0 && (
          <div className="absolute bottom-4 left-4 bg-black/80 text-white px-3 py-2 text-sm font-medium rounded">
            {product.colors.length} COLORS
          </div>
        )}
      </div>

      {/* Content section with proper spacing */}
      <div className="h-[40%] p-6 flex flex-col">
        {/* Title and Price Section */}
        <div className="flex-grow">
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 line-clamp-2 mb-3" title={product.title}>
            {product.title}
          </h3>
          
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-600">
              {product.colors && product.colors.length > 0 ? (
                <span>{product.colors.length} Colors Available</span>
              ) : (
                <span>Standard Product</span>
              )}
            </div>
            {formattedPrice && (
              <div className="text-2xl font-bold text-indigo-600">
                ₹{formattedPrice}
              </div>
            )}
          </div>
        </div>

        {/* Bottom controls section */}
        <div className="flex-shrink-0 space-y-3">
          {/* Quantity Controls */}
          <div className="flex items-center justify-center">
            <div className="flex items-center border border-gray-300 rounded">
              <button
                onClick={() => handleQuantityChange('decrement')}
                className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                disabled={quantity === 1 || isAdding}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 font-semibold border-x border-gray-300 min-w-[60px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange('increment')}
                className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                disabled={isAdding}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button - Properly positioned inside card */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`w-full py-3 px-6 font-semibold text-base flex items-center justify-center space-x-2 transition-all duration-200 ${
              justAdded 
                ? 'bg-emerald-600 text-white' 
                : isAdding 
                ? 'bg-gray-400 text-white cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {isAdding ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                <span>Adding...</span>
              </>
            ) : justAdded ? (
              <span>Added to Cart!</span>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const productsPerPage = 4;

  // Get all products
  const allProducts = useMemo(() => {
    return Object.entries(categories).flatMap(([categoryKey, category]) =>
      category.products.map(product => ({
        ...product,
        categoryKey,
        categoryName: category.name
      }))
    );
  }, []);

  // Calculate price range for filter
  const priceRangeData = useMemo(() => {
    const prices = allProducts
      .map(p => p.originalPrice)
      .filter(price => price && price > 0); // Filter out null/undefined/0 prices
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }, [allProducts]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategories.length === 0 || 
                            selectedCategories.includes(product.categoryKey);
      
      // Only include products with valid prices in price filtering
      const hasValidPrice = product.originalPrice && product.originalPrice > 0;
      const matchesPrice = !hasValidPrice || 
                          (!priceRange.min || product.originalPrice >= Number(priceRange.min)) &&
                          (!priceRange.max || product.originalPrice <= Number(priceRange.max));
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    switch (sortBy) {
      case 'name':
        filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'price-low':
        filtered = filtered.sort((a, b) => (a.originalPrice || 0) - (b.originalPrice || 0));
        break;
      case 'price-high':
        filtered = filtered.sort((a, b) => (b.originalPrice || 0) - (a.originalPrice || 0));
        break;
      case 'category':
        filtered = filtered.sort((a, b) => a.categoryName.localeCompare(b.categoryName));
        break;
      default:
        break;
    }

    return filtered;
  }, [allProducts, searchTerm, selectedCategories, priceRange, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleCategoryChange = (categoryKey) => {
    setSelectedCategories(prev => 
      prev.includes(categoryKey)
        ? prev.filter(c => c !== categoryKey)
        : [...prev, categoryKey]
    );
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setPriceRange({ min: '', max: '' });
    setSortBy('name');
    setCurrentPage(1);
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Floating Cart Button */}
      <CartButton onClick={handleCartClick} />

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Corporate Gifting Collection</h1>
              <p className="text-gray-600">
                {filteredProducts.length} premium products • Perfect for corporate gifting
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-500">Premium Quality</div>
                <div className="font-bold text-indigo-600">Branded Products</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full bg-indigo-600 text-white p-4 flex items-center justify-between mb-4 hover:bg-indigo-700 transition-colors"
            >
              <span className="font-bold">Filters & Sort</span>
              <Filter className="w-5 h-5" />
            </button>

            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              {/* Quick Search */}
              <div className="bg-white p-6 border border-gray-200 shadow-sm">
                <label className="block text-sm font-bold text-gray-900 mb-3">Search Products</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by product name..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="bg-white p-6 border border-gray-200 shadow-sm">
                <label className="block text-sm font-bold text-gray-900 mb-4">Categories</label>
                <div className="space-y-3">
                  {Object.entries(categories).map(([key, category]) => (
                    <label key={key} className="flex items-center space-x-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(key)}
                        onChange={() => handleCategoryChange(key)}
                        className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      />
                      <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                        {category.name}
                      </span>
                      <span className="ml-auto text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {category.products.length}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="bg-white p-6 border border-gray-200 shadow-sm">
                <label className="block text-sm font-bold text-gray-900 mb-4">Price Range (₹)</label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Min Price</label>
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                      placeholder={`₹${priceRangeData.min}`}
                      className="w-full px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Max Price</label>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                      placeholder={`₹${priceRangeData.max}`}
                      className="w-full px-3 py-2 border border-gray-300 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={clearFilters}
                className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 hover:bg-gray-50 transition-colors font-bold flex items-center justify-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Clear All Filters</span>
              </button>
            </div>
          </div>

          {/* Products Area */}
          <div className="flex-1">
            <div className="bg-white border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <SlidersHorizontal className="w-4 h-4 text-gray-600" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 px-4 py-2 font-medium focus:border-indigo-500 focus:outline-none bg-white"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="category">Sort by Category</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 border transition-all ${viewMode === 'grid' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 text-gray-600 hover:border-indigo-500'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 border transition-all ${viewMode === 'list' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 text-gray-600 hover:border-indigo-500'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {paginatedProducts.length > 0 ? (
              <>
                {/* Products Grid */}
                <div className={`${
                  viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 gap-8' 
                    : 'space-y-6'
                }`}>
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} viewMode={viewMode} />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2 mt-12 pt-8 border-t border-gray-200">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-6 py-3 border border-gray-300 text-gray-600 hover:border-indigo-500 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + Math.max(1, currentPage - 2);
                      if (pageNum > totalPages) return null;
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-4 py-3 border font-medium transition-colors ${
                            currentPage === pageNum
                              ? 'bg-indigo-600 text-white border-indigo-600'
                              : 'border-gray-300 text-gray-600 hover:border-indigo-500 hover:text-indigo-600'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-6 py-3 border border-gray-300 text-gray-600 hover:border-indigo-500 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                      Next
                    </button>
                  </div>
                )}

                {/* Page Info */}
                <div className="text-center mt-4">
                  <p className="text-gray-600 text-sm">
                    Showing {Math.min((currentPage - 1) * productsPerPage + 1, filteredProducts.length)} to{' '}
                    {Math.min(currentPage * productsPerPage, filteredProducts.length)} of {filteredProducts.length} products
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={clearFilters}
                  className="bg-indigo-600 text-white px-8 py-3 hover:bg-indigo-700 transition-colors font-bold"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={closeCart} />
    </div>
  );
};

export default ProductsPage;
