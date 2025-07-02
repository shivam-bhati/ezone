'use client'
import React from 'react';

const WhyChooseEZone = () => {
  // Replace these image paths with your own images
  const features = [
    {
      title: "One-Stop Solution",
      description: "Simplify procurement with a single partner.",
      image: "/images/New folder/4/1.png", // Replace with your image path
      alt: "Business handshake representing partnership"
    },
    {
      title: "Quality Assurance",
      description: "High-quality products from trusted brands.",
      image: "/images/New folder/4/2.png", // Replace with your image path
      alt: "Quality control and certification"
    },
    {
      title: "Customer-Centric Approach",
      description: "Dedicated support tailored to your needs.",
      image: "/images/New folder/4/3.png", // Replace with your image path
      alt: "Customer support and service"
    },
    {
      title: "Timely Delivery",
      description: "Efficient logistics for smooth operations.",
      image: "/images/New folder/4/4.png", // Replace with your image path
      alt: "Delivery truck and logistics"
    },
  ];

  return (
    <div className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-black mb-6 leading-tight">
            Why Choose E-Zone Techno Services Pvt Ltd.?
          </h2>
          <div className="w-24 h-1 bg-black mx-auto"></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              
              {/* Circular Image */}
              <div className="mb-6 mx-auto">
                <img 
                  src={feature.image}
                  alt={feature.alt}
                  className="w-48 h-48 rounded-full object-cover mx-auto"
                  onError={(e) => {
                    // Fallback to a placeholder if image fails to load
                    e.target.src = `https://via.placeholder.com/192x192/f3f4f6/374151?text=${encodeURIComponent(feature.title.split(' ')[0])}`;
                  }}
                />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-black group-hover:text-gray-700 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">
                  {feature.description}
                </p>
              </div>

              {/* Decorative Line */}
              <div className="mt-6 w-16 h-0.5 bg-gray-300 mx-auto"></div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default WhyChooseEZone;