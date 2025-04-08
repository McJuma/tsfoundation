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
  goals = [
    "Establish a safe and loving children's home",
    "Provide quality education for all children in our care",
    "Ensure proper healthcare and nutrition",
    "Offer emotional support and counseling",
    "Prepare children for independent living through life skills training",
  ],
  imageUrl = "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
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
              Our Goals
            </h3>
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {goals.map((goal, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-primary font-medium text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-gray-700">{goal}</span>
                    </motion.li>
                  ))}
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
