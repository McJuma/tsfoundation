import React from "react";
import VisionSection from "./VisionSection";
import MissionSection from "./MissionSection";
import { Heart, Home, BookOpen } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-primary">About Us</h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-700 mb-8">
            We came up with Tashasashafoundation on 23 August 2023. This has
            been a dream of ours for a long time, and we are determined to make
            a positive impact in the lives of orphans. Our ultimate goal is to
            establish a children's home in the near future. We believe that
            every child deserves a loving and nurturing environment to thrive
            in, and we want to be the foundation that provides just that.
            Through @tashasashafoundation, we aim to provide support, care, and
            opportunities for orphans. We want to ensure that they have access
            to education, healthcare, and emotional support. We believe that by
            investing in their well-being, we can help shape a brighter future
            for these children.
          </p>
        </div>
        <VisionSection />
        <MissionSection />

        <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-primary mb-4 text-center">
            Our Team
          </h2>
          <p className="text-gray-700 mb-6">
            The TashaSasha Foundation was founded by a group of passionate
            individuals who share a common vision of making a positive impact in
            the lives of orphaned children. Our team consists of dedicated
            volunteers, social workers, and professionals who bring diverse
            skills and experiences to our mission.
          </p>

          <div className="flex justify-center">
            <img
              src="/src/assets/images/group-photo.jpg"
              alt="Team Photo"
              className="rounded-lg max-w-full h-auto shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
