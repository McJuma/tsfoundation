import React from "react";
import HeroSection from "./HeroSection";
import VisionSection from "./VisionSection";
import GetInvolvedSection from "./GetInvolvedSection";
import TestimonialsSection from "./TestimonialsSection";
import MissionSection from "./MissionSection";

function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <MissionSection />
      <VisionSection />
      <GetInvolvedSection />
      <TestimonialsSection />
    </div>
  );
}

export default Home;
