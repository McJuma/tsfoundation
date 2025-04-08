import React from "react";
import HeroSection from "./HeroSection";
import VisionSection from "./VisionSection";
import GetInvolvedSection from "./GetInvolvedSection";
import TestimonialsSection from "./TestimonialsSection";

function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <VisionSection />
      <GetInvolvedSection />
      <TestimonialsSection />
    </div>
  );
}

export default Home;
