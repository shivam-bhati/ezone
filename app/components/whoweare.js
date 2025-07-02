import React from 'react';
import { 
  Shield, 
  Target, 
  Users, 
  CheckCircle, 
  TrendingUp, 
  Handshake,
  ArrowRight,
  Star,
  Award
} from 'lucide-react';

const WhoWeAre = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-black text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4 mr-2" />
            About E-Zone Techno Services
          </div>
          <h1 className="text-5xl font-bold text-black mb-6">
            Who We Are
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Beyond Just Suppliers - Your Strategic Business Partner
          </p>
        </div>

        {/* Main Content Section */}
        <div className="grid lg:grid-cols-5 gap-16 items-center mb-20">
          
          {/* Left Content - 3 columns */}
          <div className="lg:col-span-3 space-y-12">
            
            {/* Comprehensive Solutions */}
            <div className="group">
              <div className="flex items-start space-x-4">
                <div className="bg-black p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-black mb-4">Comprehensive Solutions</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    E-Zone Techno Services Pvt Ltd. is a full-service provider for businesses, offering an extensive range of products and services designed to meet diverse operational needs.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    From essential office supplies to specialized industrial equipment, we ensure that every aspect of your business is covered with high-quality solutions.
                  </p>
                </div>
              </div>
            </div>

            {/* Optimize Operations */}
            <div className="group">
              <div className="flex items-start space-x-4">
                <div className="bg-black p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-black mb-4">Optimize Operations</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    We are dedicated to enhancing your productivity and efficiency. By providing top-tier products and tailored services, E-Zone helps streamline your daily operations.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm text-black">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      Reduce Overheads
                    </span>
                    <span className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm text-black">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Boost Productivity
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Foster Relationships */}
            <div className="group">
              <div className="flex items-start space-x-4">
                <div className="bg-black p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-black mb-4">Foster Relationships</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Beyond transactions, we believe in building lasting partnerships. E-Zone is committed to enhancing workspaces and cultivating strong, supportive connections with our clients.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    We strive to understand your unique challenges and provide personalized support, ensuring a collaborative journey towards shared success.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Image - 2 columns */}
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/New folder/image-2-1.png"
                  alt="Modern business team collaboration" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Stats Cards */}
              <div className="absolute -left-6 top-1/4 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="bg-black p-2 rounded-lg">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black">Quality Assured</p>
                    <p className="text-xs text-gray-500">100% Guarantee</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-6 bottom-1/4 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="bg-black p-2 rounded-lg">
                    <Handshake className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black">Trusted Partner</p>
                    <p className="text-xs text-gray-500">Long-term Success</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section - Mission Statement */}
        <div className="bg-black text-white p-12 rounded-3xl">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-6">Our Unwavering Commitment</h3>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Our unwavering commitment is to deliver <span className="text-white font-semibold">uncompromising quality</span>, 
              <span className="text-white font-semibold"> guaranteed reliability</span>, and 
              <span className="text-white font-semibold"> unparalleled service</span> in every interaction.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="text-left">
                <p className="text-gray-300 leading-relaxed">
                  EZone Techno Services Pvt Ltd. positions itself as your single, trusted point of contact for all your business needs, simplifying procurement and management so you can focus on your core objectives.
                </p>
              </div>
              <div className="text-left">
                <p className="text-gray-300 leading-relaxed">
                  We aim to be more than just a supplier; we aspire to be a strategic partner invested in your long-term growth and success.
                </p>
              </div>
            </div>

            <button className="inline-flex items-center bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300">
              Partner With Us Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>

        {/* Values Strip */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center group cursor-pointer">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-black transition-colors duration-300">
              <CheckCircle className="w-8 h-8 text-black group-hover:text-white" />
            </div>
            <h4 className="text-lg font-bold text-black mb-2">Uncompromising Quality</h4>
            <p className="text-gray-600 text-sm">Every product and service meets our highest standards</p>
          </div>

          <div className="text-center group cursor-pointer">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-black transition-colors duration-300">
              <Shield className="w-8 h-8 text-black group-hover:text-white" />
            </div>
            <h4 className="text-lg font-bold text-black mb-2">Guaranteed Reliability</h4>
            <p className="text-gray-600 text-sm">Consistent performance you can depend on</p>
          </div>

          <div className="text-center group cursor-pointer">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-black transition-colors duration-300">
              <Award className="w-8 h-8 text-black group-hover:text-white" />
            </div>
            <h4 className="text-lg font-bold text-black mb-2">Unparalleled Service</h4>
            <p className="text-gray-600 text-sm">Exceptional support that exceeds expectations</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WhoWeAre;