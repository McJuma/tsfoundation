import React from "react";
import HeroSection from "./HeroSection";
import GetInvolvedSection from "./GetInvolvedSection";
import TestimonialsSection from "./TestimonialsSection";

function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <GetInvolvedSection />
      <TestimonialsSection />
    </div>
  );
}

export default Home;
