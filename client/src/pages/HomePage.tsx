import AboutUs from "@/components/home/AboutUs";
import ContactUs from "@/components/home/ContactUs";
import HeroSection from "@/components/home/HeroSection";
import Navbar from "@/components/home/Navbar";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutUs />
      <ContactUs />
    </>
  );
};

export default HomePage;
