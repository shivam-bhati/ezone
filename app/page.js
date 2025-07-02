import Navigation from "./components/navbar";
import Hero from "./components/hero";
import Services from "./components/services";
import AboutSection from "./components/whoweare";
import Footer from "./components/footer";
import ContactSection from "./components/contact";
import EZoneIndustrialSection from "./components/supplies";
import EZoneServices from "./components/services2";
import WhyChooseEZone from "./components/whychoose";
export default function Home() {
  return (
    <div className="bg-gray-50">
      
      <Navigation />
      <Hero />
      <AboutSection />
      <Services />
      <EZoneIndustrialSection />
      <EZoneServices />
      <WhyChooseEZone />
      <ContactSection />
      <Footer />
    </div>
  );
}
