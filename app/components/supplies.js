import React from 'react';
import { Shield, Zap, CheckCircle, Wrench } from 'lucide-react';

const EZoneIndustrialSection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <img 
                src="/images/New folder/image-5-1.png" // Replace with your image path
                alt="Industrial Safety Equipment"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-orange-500 text-white p-3 rounded-full shadow-lg">
                <Wrench className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-green-500 text-white p-3 rounded-full shadow-lg">
                <CheckCircle className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                <Zap className="w-4 h-4" />
                Specialised Supplies
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Powering Your Operations,
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Safely
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                with E-Zone Industrial Safety Equipment
              </p>
            </div>

            {/* Description */}
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                High-quality gear for a secure working environment. From safety helmets and protective gloves to comprehensive eye protection and essential first-aid kits.
              </p>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-amber-50 to-yellow-100 p-6 rounded-xl shadow-sm border border-amber-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center border border-amber-300">
                      <Shield className="w-5 h-5 text-amber-700" />
                    </div>
                    <h3 className="font-semibold text-amber-900">Safety Equipment</h3>
                  </div>
                  <p className="text-sm text-amber-800">
                    Helmets, gloves, eye protection, and first-aid kits
                  </p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-yellow-100 p-6 rounded-xl shadow-sm border border-amber-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center border border-amber-300">
                      <Zap className="w-5 h-5 text-amber-700" />
                    </div>
                    <h3 className="font-semibold text-amber-900">Electrical Consumables</h3>
                  </div>
                  <p className="text-sm text-amber-800">
                    Wires, cables, switches, bulbs, and circuit breakers
                  </p>
                </div>
              </div>

              {/* Call to action */}
              <div className="pt-4">
                <p className="text-base text-gray-700">
                  E-Zone provides essential specialised supplies that meet various operational and safety requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EZoneIndustrialSection;