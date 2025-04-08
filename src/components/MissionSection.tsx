import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface MissionSectionProps {
    title?: string;
    description?: string;
}

const MissionSection = ({
    title = "Our Mission",
    description = "To nurture the potential of young people, particularly those in orphanages, by providing essential resources, fostering personal growth, and promoting community engagement through impactful programs, mentorship, and service initiatives."
}: MissionSectionProps) => {
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
                  </motion.div>
                </div>
              </div>
            </section>
          );
}
export default MissionSection;