import Layout from "./layout";
import HeroSection from "./landing/HeroSection";
import HowItWorks from "./landing/HowItWorks";
import GlobalPartner from "./landing/GlobalPartner";
import Reviews from "./landing/Reviews";
import FAQ from "./landing/FAQ";

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <HowItWorks />
      <GlobalPartner />
      <Reviews />
      <FAQ />
    </Layout>
  );
}

