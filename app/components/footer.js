export default function Footer() {
  const services = [
    "General Supplies",
    "Specialised Supplies", 
    "Corporate Solutions",
    "Printing & Customisation",
    "IT & Infrastructure",
    "Facility Management"
  ]
  
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <span className="text-black font-bold text-lg">E</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">E-Zone Techno</h3>
                <p className="text-sm text-gray-400">Services</p>
              </div>
            </div>
            <p className="text-gray-400">
              Your Complete Business Solutions Partner - Streamlining Operations, Enhancing Productivity, Building Relationships.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              {services.map((service) => (
                <li key={service}>
                  <a href="#services" className="hover:text-white transition-colors duration-200 text-sm">{service}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              {['About Us', 'Our Team', 'Careers', 'Blog', 'Partners'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-white transition-colors duration-200 text-sm">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <div className="space-y-3 text-gray-400 text-sm">
              <div className="flex items-start space-x-2">
                <span className="text-white mt-1">📍</span>
                <p>A584, Sushant Lok Phase 1,Opposite Iffco Chowk Metro Station,
                      Gurugram, Haryana</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-white">📞</span>
                <a href="tel:+1234567890" className="hover:text-white transition-colors duration-200">
                  +91 9650758299
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-white">✉️</span>
                <a href="mailto:info@ezonetech.com" className="hover:text-white transition-colors duration-200">
                  ezonetechnoservices@hotmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 E-Zone Techno Services. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
              <a href="#terms" className="hover:text-white transition-colors duration-200">Terms of Service</a>
              <a href="#cookies" className="hover:text-white transition-colors duration-200">Cookie Policy</a>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <span className="sr-only">Facebook</span>
                📘
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <span className="sr-only">Twitter</span>
                🐦
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <span className="sr-only">LinkedIn</span>
                💼
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <span className="sr-only">Instagram</span>
                📷
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}