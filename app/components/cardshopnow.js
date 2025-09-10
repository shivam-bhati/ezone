'use client';


const CorporateGiftingSection = () => {
  const cards = [
    {
      title: "Premium Corporate Gifts",
      bgImage: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
    },
    {
      title: "Team Recognition",
      bgImage: "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Client Appreciation", 
      bgImage: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Employee Wellness",
      bgImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Custom Branding",
      bgImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80"
    }
  ];

  return (
    <section className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white"></div>
      
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full blur-2xl opacity-40 animate-pulse delay-75"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-60 animate-pulse delay-150"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Three Column Layout with minimal gap */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 max-w-7xl mx-auto">
          {/* First Column - Single Large Card */}
          <div className="lg:col-span-1">
            <div className="group h-[600px] relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700">
              {/* Background Image with zoom out on hover */}
              <div 
                className="absolute inset-0 bg-cover bg-center scale-110 group-hover:scale-100 transition-transform duration-700"
                style={{
                  backgroundImage: `url('${cards[0].bgImage}')`
                }}
              ></div>
              
              {/* Overlay for text readability */}
              <div className="absolute inset-0 bg-black/20"></div>
              
              <div className="relative z-10 h-full flex flex-col justify-end p-8">
                <div className="text-center">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {cards[0].title}
                  </h3>
                  <p className="text-white font-semibold hover:text-white/80 cursor-pointer transition-colors duration-300 text-lg">
                    Shop Now
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Second Column - Two Cards */}
          <div className="lg:col-span-1 space-y-2">
            {cards.slice(1, 3).map((card, index) => (
              <div
                key={index}
                className="group h-[300px] relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500"
              >
                {/* Background Image with zoom out on hover */}
                <div 
                  className="absolute inset-0 bg-cover bg-center scale-110 group-hover:scale-100 transition-transform duration-700"
                  style={{
                    backgroundImage: `url('${card.bgImage}')`
                  }}
                ></div>
                
                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-black/20"></div>
                
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {card.title}
                    </h3>
                    <p className="text-white font-semibold hover:text-white/80 cursor-pointer transition-colors duration-300">
                      Shop Now
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Third Column - Two Cards */}
          <div className="lg:col-span-1 space-y-2">
            {cards.slice(3, 5).map((card, index) => (
              <div
                key={index}
                className="group h-[300px] relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500"
              >
                {/* Background Image with zoom out on hover */}
                <div 
                  className="absolute inset-0 bg-cover bg-center scale-110 group-hover:scale-100 transition-transform duration-700"
                  style={{
                    backgroundImage: `url('${card.bgImage}')`
                  }}
                ></div>
                
                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-black/20"></div>
                
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {card.title}
                    </h3>
                    <p className="text-white font-semibold hover:text-white/80 cursor-pointer transition-colors duration-300">
                      Shop Now
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorporateGiftingSection;
