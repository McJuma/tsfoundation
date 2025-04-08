import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface VisionSectionProps {
  title?: string;
  description?: string;
  goals?: string[];
  imageUrl?: string;
}

const VisionSection = ({
  title = "Our Vision",
  description = "At TashaSashaFoundation, our ultimate goal is to establish a children's home in the near future. We believe that every child deserves a loving and nurturing environment to thrive in, and we want to be the foundation that provides just that.",
  // goals = [
  //   "Establish a safe and loving children's home",
  //   "Provide quality education for all children in our care",
  //   "Ensure proper healthcare and nutrition",
  //   "Offer emotional support and counseling",
  //   "Prepare children for independent living through life skills training",
  // ],
  imageUrl = "src/assets/images/kids.jpg",
}: VisionSectionProps) => {
  return (
    <section className="py-16 px-4 md:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {title}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="rounded-lg overflow-hidden shadow-xl"
          >
            <img
              src={imageUrl}
              alt="Children in a nurturing environment"
              className="w-full h-[400px] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">
              Our Goal
            </h3>
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  Our way of charity is not all about giving, it's about making a meaningful difference in the lives of those in need, showing them that even in the midst of their situations, the Lord is present, fostering a sense of community and inspiring others to join in the effort to raise a generation that not only knows God but understand His will to humankind ❤
                </ul>
              </CardContent>
            </Card>
            <p className="mt-6 text-gray-600 italic">
              "We envision a world where every child has access to love, care,
              and opportunities to reach their full potential."
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
