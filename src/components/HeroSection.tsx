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
      {/* Background slideshow */}
      {/* <Slideshow
        images={slideImages}
        interval={6000}
        showControls={true}
        className="absolute inset-0"
      /> */}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content container */}
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          {/* Foundation name */}
          <h1 className="mb-2 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            TashaSasha<span className="text-tertiary">Foundation</span>
          </h1>

          {/* Founding date */}
          <p className="mb-6 text-sm font-medium uppercase tracking-wider text-primary-foreground/80">
            Established August 23, 2023
          </p>

          {/* Mission statement */}
          <p className="mb-8 text-xl font-light leading-relaxed md:text-2xl">
            Providing love, care, and a nurturing environment for orphans. Our
            mission is to create a place where every child feels at home.
          </p>

          {/* Call to action button */}
            <Button
            size="lg"
            onClick={() => (window.location.href = "/donate")}
            className="rounded-full px-8 py-6 text-lg font-semibold transition-all hover:scale-105"
            >
            Donate Now
            </Button>&nbsp;
            {/* learn more button */}
            <Button className="rounded-full px-8 py-6 text-lg font-semibold transition-all hover:scale-105"
              onClick={() => (window.location.href = "/about")}>
              Learn More
            </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
