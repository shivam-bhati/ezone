import React from 'react';

const EZoneServices = () => {
  return (
    <div className="bg-white min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Corporate Solutions */}
          <div className="group">
            <div className="space-y-8">
              {/* Image */}
              <div className="w-full h-80 overflow-hidden rounded-lg">
                <img 
                  src="/images/New folder/image-6-1.png" // Replace with your image path
                  alt="Corporate gifts and branded merchandise" 
                  className="w-full h-full object-cover  hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Content */}
              <div className="space-y-6">
                <h3 className="text-4xl font-bold text-black leading-tight">
                  Corporate Solutions
                </h3>
                <p className="text-xl text-gray-600 font-medium">
                  Strengthen Bonds, Impress Clients with E-Zone Corporate Giftings
                </p>
                
                <div className="space-y-6">
                  {/* Premium Gifts */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-black text-lg mb-2">Premium Gifts</h4>
                      <p className="text-gray-700 leading-relaxed">
                        Curated premium gifts tailored to your brand. Branded merchandise, executive gifts, and appreciation tokens.
                      </p>
                    </div>
                  </div>
                  
                  {/* Joining Kits */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-black text-lg mb-2">Customised Joining Kits</h4>
                      <p className="text-gray-700 leading-relaxed">
                        Personalised kits to welcome new team members. Branded notebooks, pens, mugs, and tech gadgets.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-black">
                    <p className="text-gray-800 font-medium text-lg">
                      Make a lasting impression with thoughtful gestures. Ensure a memorable onboarding experience.
                    </p>
                  </div>
                </div>

                <button className="bg-black text-white px-10 py-4 hover:bg-gray-800 transition-colors duration-300 font-bold tracking-wide text-lg rounded-lg">
                  Explore Solutions
                </button>
              </div>
            </div>
          </div>

          {/* Printing Solutions */}
          <div className="group">
            <div className="space-y-8">
              {/* Image */}
              <div className="w-full h-80 overflow-hidden rounded-lg">
                <img 
                  src="/images/New folder/image-7-1.png" // Replace with your image path
                  alt="Professional printing services and equipment" 
                  className="w-full h-full object-cover  hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Content */}
              <div className="space-y-6">
                <h3 className="text-4xl font-bold text-black leading-tight">
                  Printing Solutions
                </h3>
                <p className="text-xl text-gray-600 font-medium">
                  High-Quality Prints for Every Need by E-Zone
                </p>
                
                <div className="space-y-6">
                  {/* Office Printing */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">01</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-black text-lg mb-2">Office Printing</h4>
                      <p className="text-gray-700 leading-relaxed">
                        Standard services for daily documents and reports. A4/A3 prints, black & white, color, binding.
                      </p>
                      <div className="mt-3 flex space-x-4 text-sm text-gray-600">
                        <span className="bg-gray-100 px-3 py-1 rounded-full">A4/A3</span>
                        <span className="bg-gray-100 px-3 py-1 rounded-full">B&W</span>
                        <span className="bg-gray-100 px-3 py-1 rounded-full">Color</span>
                        <span className="bg-gray-100 px-3 py-1 rounded-full">Binding</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Marketing Printing */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">02</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-black text-lg mb-2">Marketing & Promotional Printing</h4>
                      <p className="text-gray-700 leading-relaxed">
                        High-impact collateral to capture attention. Brochures, flyers, posters, business cards, banners.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-600">
                        <span className="bg-gray-100 px-3 py-1 rounded-full">Brochures</span>
                        <span className="bg-gray-100 px-3 py-1 rounded-full">Flyers</span>
                        <span className="bg-gray-100 px-3 py-1 rounded-full">Posters</span>
                        <span className="bg-gray-100 px-3 py-1 rounded-full">Business Cards</span>
                        <span className="bg-gray-100 px-3 py-1 rounded-full">Banners</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Large Format Printing */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">03</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-black text-lg mb-2">Large Format & Specialised Printing</h4>
                      <p className="text-gray-700 leading-relaxed">
                        Unique and large-scale requirements with precision. Blueprints, custom signage, event backdrops, Standees etc.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-600">
                        <span className="bg-gray-100 px-3 py-1 rounded-full">Blueprints</span>
                        <span className="bg-gray-100 px-3 py-1 rounded-full">Signage</span>
                        <span className="bg-gray-100 px-3 py-1 rounded-full">Backdrops</span>
                        <span className="bg-gray-100 px-3 py-1 rounded-full">Standees</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quality Assurance */}
                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-black">
                    <div className="flex items-center space-x-3 mb-3">
                      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <h4 className="font-bold text-black text-lg">Quality Guarantee</h4>
                    </div>
                    <p className="text-gray-800 font-medium">
                      E-Zone provides comprehensive printing solutions. We ensure crisp quality and timely delivery.
                    </p>
                  </div>
                </div>

                <button className="bg-black text-white px-10 py-4 hover:bg-gray-800 transition-colors duration-300 font-bold tracking-wide text-lg rounded-lg">
                  View Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EZoneServices;