import React from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const ContactUs = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">Contact Us</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get in touch with our dedicated support team. We&apos;re here to help you with all your queries and provide the best solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Professional office environment" 
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-black text-white p-6 rounded-xl shadow-xl">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Information */}
          <div className="space-y-8">
            {/* Email Section */}
            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-black">
              <div className="flex items-start space-x-4">
                <div className="bg-black p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-black mb-2">Email Us</h3>
                  <p className="text-gray-600 mb-3">
                    Send your queries to our dedicated support. We reply promptly.
                  </p>
                  <a 
                    href="mailto:ezonetechnoservices@hotmail.com" 
                    className="text-black font-semibold hover:underline inline-flex items-center space-x-2"
                  >
                    <span>ezonetechnoservices@hotmail.com</span>
                    <Send className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Phone Section */}
            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-black">
              <div className="flex items-start space-x-4">
                <div className="bg-black p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-black mb-2">Call Us</h3>
                  <p className="text-gray-600 mb-3">
                    Our team is ready to assist you. Reach us during business hours.
                  </p>
                  <div className="space-y-2">
                    <a 
                      href="tel:+919650758299" 
                      className="block text-black font-semibold hover:underline"
                    >
                      +91 9650758299
                    </a>
                    <a 
                      href="tel:+917017862629" 
                      className="block text-black font-semibold hover:underline"
                    >
                      +91 7017862629
                    </a>
                    <a 
                      href="tel:+917088947777" 
                      className="block text-black font-semibold hover:underline"
                    >
                      +91 7088947777
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Office Section */}
            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-black">
              <div className="flex items-start space-x-4">
                <div className="bg-black p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-black mb-2">Our Office</h3>
                  <p className="text-gray-600 mb-3">
                    Visit our headquarters for consultations. Schedule an appointment.
                  </p>
                  <div className="text-black font-semibold">
                    <p className="mb-1">Reg. Office:</p>
                    <p className="text-gray-700 leading-relaxed">
                      A584, Sushant Lok Phase 1,<br />
                      Opposite Iffco Chowk Metro Station,<br />
                      Gurugram, Haryana
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
