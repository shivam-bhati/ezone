// components/Features.js
'use client'
import { useState, useEffect, useRef } from 'react'

export default function Features() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      title: 'One-Stop Solution',
      description: 'Simplify procurement with a single partner for all your business needs.',
      icon: '🎯',
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
      stats: '500+ Products',
      detail: 'Comprehensive catalog of products and services under one roof'
    },
    {
      title: 'Quality Assurance',
      description: 'High-quality products from trusted brands with guaranteed reliability.',
      icon: '⭐',
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500',
      stats: '99.9% Quality',
      detail: 'Rigorous quality control and trusted brand partnerships'
    },
    {
      title: 'Customer-Centric Approach',
      description: 'Dedicated support tailored to your unique business requirements.',
      icon: '🤝',
      color: 'green',
      gradient: 'from-green-500 to-emerald-500',
      stats: '24/7 Support',
      detail: 'Personalized service with dedicated account management'
    },
    {
      title: 'Timely Delivery',
      description: 'Efficient logistics and supply chain for smooth business operations.',
      icon: '🚀',
      color: 'orange',
      gradient: 'from-orange-500 to-red-500',
      stats: '98% On-Time',
      detail: 'Advanced logistics network ensuring prompt deliveries'
    }
  ]

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6">
            <span className="text-sm text-blue-400 font-medium">Why Choose E-Zone</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Excellence in Every Detail
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Discover what sets us apart in delivering exceptional business solutions with unmatched quality and service.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group relative p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/70 rounded-2xl border transition-all duration-500 cursor-pointer hover:scale-105 ${
                activeFeature === index
                  ? 'border-blue-500/50 bg-gradient-to-br from-slate-800/70 to-slate-900/90'
                  : 'border-slate-700/30 hover:border-blue-500/30'
              } ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onClick={() => setActiveFeature(index)}
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
              
              {/* Active indicator */}
              {activeFeature === index && (
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient} rounded-t-2xl`}></div>
              )}

              <div className="relative z-10">
                {/* Icon */}
                <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">{feature.icon}</span>
                </div>

                {/* Stats */}
                <div className={`text-2xl font-bold mb-2 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                  {feature.stats}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Details */}
        <div className={`p-8 bg-gradient-to-r from-slate-800/30 to-slate-700/30 rounded-3xl border border-slate-600/30 backdrop-blur-sm transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Feature info */}
            <div>
              <div className="flex items-center mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${features[activeFeature].gradient} flex items-center justify-center text-3xl mr-4`}>
                  {features[activeFeature].icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {features[activeFeature].title}
                  </h3>
                  <p className={`text-lg font-semibold bg-gradient-to-r ${features[activeFeature].gradient} bg-clip-text text-transparent`}>
                    {features[activeFeature].stats}
                  </p>
                </div>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                {features[activeFeature].detail}
              </p>
              <button className={`px-6 py-3 rounded-xl bg-gradient-to-r ${features[activeFeature].gradient} text-white font-medium hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                Learn More
              </button>
            </div>

            {/* Right side - Visual element */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-24 rounded-xl transition-all duration-500 ${
                      i === activeFeature
                        ? `bg-gradient-to-br ${features[activeFeature].gradient} opacity-80`
                        : 'bg-slate-800/50 opacity-30'
                    }`}
                  />
                ))}
              </div>
              
              {/* Animated circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${features[activeFeature].gradient} opacity-20 animate-pulse`}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-slate-400 text-sm">Happy Clients</div>
            </div>
            <div className="w-px h-12 bg-slate-700"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">99.9%</div>
              <div className="text-slate-400 text-sm">Quality Rate</div>
            </div>
            <div className="w-px h-12 bg-slate-700"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-slate-400 text-sm">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}