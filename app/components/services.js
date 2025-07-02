'use client'
export default function ServicesSection() {
  // Replace these image paths with your own images
  const coreOfferings = [
    {
      title: "General Supplies",
      image: "/images/New folder/supply/image-3-1.png", // Replace with your image path
      description: "From essential office stationery like pens, paper, and notebooks to critical housekeeping essentials, we ensure your workspace is always well-stocked and functional. We cover everything needed for day-to-day operations."
    },
    {
      title: "Specialised Supplies",
      image: "/images/New folder/supply/image-3-2.png", // Replace with your image path
      description: "We provide crucial industrial safety equipment to protect your workforce, including personal protective gear, as well as a wide range of electrical consumables vital for the smooth and safe operation of your machinery and facilities. Our focus is on compliance and reliability."
    },
    {
      title: "Corporate Solutions",
      image: "/images/New folder/supply/image-3-3.png", // Replace with your image path
      description: "Strengthen client relationships and boost employee morale with our tailored corporate gifting services. We also offer customised joining kits for new hires, ensuring a warm welcome and professional start, all branded to your company's identity."
    },
    {
      title: "Printing & Customisation",
      image: "/images/New folder/supply/image-3-4.png", // Replace with your image path
      description: "Addressing all your printing and customisation needs, from high-quality brochures, business cards, and marketing materials to bespoke branded merchandise. We ensure crisp, professional results that accurately reflect your brand image."
    },
    {
      title: "IT & Infrastructure",
      image: "/images/New folder/supply/image-3-5.png", // Replace with your image path
      description: "We offer comprehensive IT hardware supply, including laptops, desktops, servers, and networking equipment, paired with expert maintenance services to ensure your technology infrastructure runs seamlessly. Our support helps minimize downtime and maximize productivity."
    },
    {
      title: "Facility Management",
      image: "/images/New folder/supply/image-3-6.png", // Replace with your image path
      description: "Our facility management services encompass professional cleaning and sanitization, essential civil work and general repairs to maintain your premises, and the supply and arrangement of office furniture and plants to create a productive and pleasant working environment."
    }
  ]

  const generalSupplies = [
    {
      title: "Stationery Items",
      image: "/images/New folder/General supply/image-4-1.png", // Replace with your image path
      description: "High-quality stationery for a well-stocked office.",
      details: "Pens, paper, notebooks, files, toners, and cartridges.",
      subtext: "Ensure your team has everything needed for productivity."
    },
    {
      title: "Housekeeping Items",
      image: "/images/New folder/General supply/image-4-2.png", // Replace with your image path
      description: "Comprehensive cleaning and hygiene products for a healthy environment.",
      details: "Disinfectants, hand sanitisers, and waste bins.",
      subtext: "Maintain a pristine and inviting workspace."
    }
  ]

  return (
    <section id="services" className="py-20 bg-white">
      {/* Core Offerings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
            Our Core Offerings: Your Business, Simplified by E-Zone
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            E-Zone offers a diverse portfolio of essential services. We cover daily needs to strategic initiatives.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {coreOfferings.map((offering, index) => (
            <div key={offering.title} className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={offering.image}
                  alt={offering.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to a placeholder if image fails to load
                    e.target.src = `https://via.placeholder.com/400x256/f3f4f6/374151?text=${encodeURIComponent(offering.title)}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-2xl font-bold text-white">{offering.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 leading-relaxed">
                  {offering.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* General Supplies Detail Section */}
        <div className="py-20 bg-gradient-to-br from-gray-50 to-white rounded-3xl">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6">
                General Supplies: Seamless Operations, Every Day with E-Zone
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {generalSupplies.map((supply, index) => (
                <div key={supply.title} className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="relative h-80 overflow-hidden">
                    <img 
                      src={supply.image}
                      alt={supply.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        // Fallback to a placeholder if image fails to load
                        e.target.src = `https://via.placeholder.com/400x320/f3f4f6/374151?text=${encodeURIComponent(supply.title)}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-3xl font-bold text-white mb-3">{supply.title}</h3>
                      <p className="text-gray-200 text-lg">{supply.description}</p>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="space-y-4">
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {supply.details}
                      </p>
                      <p className="text-gray-600 font-medium">
                        {supply.subtext}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}