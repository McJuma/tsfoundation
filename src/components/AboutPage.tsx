import React from "react";
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

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <Heart className="h-12 w-12 text-destructive" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-600">
              To provide love, care, and support to orphaned children, ensuring
              they have access to education, healthcare, and emotional support.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <Home className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Our Goal</h3>
            <p className="text-gray-600">
              To establish a children's home that provides a loving and
              nurturing environment where orphaned children can thrive and reach
              their full potential.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex justify-center mb-4">
              <BookOpen className="h-12 w-12 text-amber-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Our Values</h3>
            <p className="text-gray-600">
              Compassion, integrity, dedication, and the belief that every child
              deserves a chance to grow in a supportive and loving environment.
            </p>
          </div>
        </div>

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
              src="../src/assets/images/group-photo.jpg"
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
