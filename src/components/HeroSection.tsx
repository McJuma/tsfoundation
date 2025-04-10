import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Slideshow from "./Slideshow";

interface HeroSectionProps {
  onDonateClick?: () => void;
}

const HeroSection = ({
  onDonateClick = () => (window.location.href = "/donate"),
}: HeroSectionProps) => {
  const slideImages = [
    "../src/assets/images/group-photo.jpg",
    "../src/assets/images/group-photo.jpg",
    "../src/assets/images/group-photo.jpg",
  ];

  return (
    <div className="relative h-[700px] w-full overflow-hidden bg-slate-900">
      <Slideshow images={slideImages} />
    </div>
  );
};

export default HeroSection;
