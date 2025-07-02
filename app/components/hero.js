'use client'
import { useState, useEffect } from 'react'

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section id="home" className="pt-16">
      <div className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            
            {/* Left Side - Plain Image */}
            <div className={`transition-all duration-1000 delay-300 ${
              isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop"
                  alt="Modern Business Technology"
                  className="w-full h-[600px] object-cover"
                />
              </div>
            </div>

            {/* Right Side - Updated Text Content */}
            <div className={`space-y-8 transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              
              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-black">
                  E-Zone Techno Services Pvt Ltd.: Your Complete Business Solutions Partner
                </h1>
                
                <div className="space-y-4">
                  <p className="text-xl font-semibold text-gray-800">
                    Streamlining Operations | Enhancing Productivity | Building Relationships
                  </p>
                </div>
              </div>

              {/* Single Action Button */}
              <div>
                <button className="group bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-12 py-4 rounded-full font-bold text-xl hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center space-x-3">
                  <span>Start Your Project</span>
                  <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}