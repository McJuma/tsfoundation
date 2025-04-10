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
    "../src/assets/images/kids.jpg",
    "../src/assets/images/foodaid.jpg",
  ];

  const slideTexts = [
    "Empowering Orphans Since August 23, 2023",
    "Creating a Loving Home for Every Child",
    "Join Us in Making a Difference",
  ];

  return (
    <div className="relative h-[700px] w-full overflow-hidden bg-slate-900">
      <Slideshow images={slideImages} texts={slideTexts} />

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-white text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            TashaSasha Foundation
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md">
            Dedicated to providing love, care, and a future for orphaned
            children in Kenya
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => (window.location.href = "/donate")}
              size="lg"
              variant="destructive"
              className="text-lg px-8 py-6"
            >
              Donate Now
            </Button>
            <Button
              onClick={() => (window.location.href = "/get-involved")}
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-transparent border-white hover:bg-white hover:text-black transition-colors"
            >
              Get Involved
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
