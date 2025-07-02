'use client'
'use client'
import { useState, useEffect } from 'react'

export default function Navigation() {
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('nav')) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleNavClick = (item) => {
    const targetId = item.toLowerCase()
    const element = document.getElementById(targetId)
    
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
    
    // Close mobile menu after clicking
    setIsMobileMenuOpen(false)
  }

  const navItems = ['Home', 'Services', 'About', 'Portfolio', 'Contact']

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-700 ${
        scrollY > 50 ? 'bg-white/95 backdrop-blur-xl shadow-lg' : 'bg-transparent'
      } ${isLoaded ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 w-full">
            
            {/* Logo */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              <div className="relative">
                <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center transform rotate-12">
                  <span className="text-white font-bold text-lg transform -rotate-12">E</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gray-400 rounded-full animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-black text-lg">E-Zone Techno</h1>
                <p className="text-xs text-gray-500 -mt-1">Services</p>
              </div>
              <div className="sm:hidden">
                <h1 className="font-bold text-black text-base">E-Zone</h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 flex-grow justify-center">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => handleNavClick(item)}
                  className="text-black hover:text-gray-600 transition-colors duration-200 font-medium relative group whitespace-nowrap"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>

            {/* CTA Button and Mobile Menu */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              <button className="hidden sm:block bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap">
                Get Quote
              </button>
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 relative z-60"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className={`w-full h-0.5 bg-black transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                  }`}></span>
                  <span className={`w-full h-0.5 bg-black transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : ''
                  }`}></span>
                  <span className={`w-full h-0.5 bg-black transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                  }`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${
        isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`} onClick={() => setIsMobileMenuOpen(false)}></div>

      {/* Mobile Menu */}
      <div className={`fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-xl shadow-lg z-40 transition-all duration-300 md:hidden ${
        isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <div className="w-full max-w-7xl mx-auto px-4 py-6">
          <div className="space-y-4">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className="block w-full text-left text-black hover:text-gray-600 transition-colors duration-200 font-medium py-3 px-2 hover:bg-gray-50 rounded-lg"
              >
                {item}
              </button>
            ))}
            
            {/* Mobile CTA Button */}
            <div className="pt-4 border-t border-gray-200">
              <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}