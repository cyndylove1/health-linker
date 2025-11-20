import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import LatestJobs from "../components/LatestJobs";
import Information from "../components/Information";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";


export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <CategorySection />
      <LatestJobs />
      <Information />
      <FAQ />
      <Footer />
    </>
  );
}
