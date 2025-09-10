import Navigation from "./components/navbar";
import Hero from "./components/hero";
import Services from "./components/services";
import AboutSection from "./components/whoweare";
import Footer from "./components/footer";
import ContactSection from "./components/contact";
import EZoneIndustrialSection from "./components/supplies";
import EZoneServices from "./components/services2";
import WhyChooseEZone from "./components/whychoose";
import ProductSection from "./components/products/ProductSection";
import MinimalProductDuo from "./components/MinimalProductDuo";
export default function Home() {


  return (
    
    <div >
      <Navigation />
      <Hero />
      <AboutSection />
      <ProductSection />
      <Services />
      <EZoneIndustrialSection />
      <MinimalProductDuo />
      <EZoneServices />
      <WhyChooseEZone />
      <ContactSection />
      <Footer />
    </div>
    

    
  );
}
