import AboutUs from "@/components/home/AboutUs";
import ContactUs from "@/components/home/ContactUs";
import Copyright from "@/components/home/Copyright";
import Footer from "@/components/home/Footer";
import HeroSection from "@/components/home/HeroSection";
import Navbar from "@/components/home/Navbar";
import WhyUs from "@/components/home/WhyUs";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutUs />
      <WhyUs />
      <ContactUs />
      <Footer />
      <Copyright />
    </>
  );
};

export default HomePage;
