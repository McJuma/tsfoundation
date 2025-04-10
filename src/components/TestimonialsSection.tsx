import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "The TashaSasha Foundation has made an incredible difference in my life. They provided me with education, care, and a sense of belonging when I needed it most.",
    author: "Sarah M.",
    role: "Former Beneficiary",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    quote:
      "Volunteering with TashaSasha Foundation has been one of the most rewarding experiences of my life. The impact they have on these children's lives is immeasurable.",
    author: "James K.",
    role: "Volunteer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
  },
  {
    quote:
      "I've been a donor for two years now, and I'm always impressed by how transparent and effective the foundation is with their resources. Every shilling truly makes a difference.",
    author: "Mary W.",
    role: "Regular Donor",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mary",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Testimonials
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from the people whose lives have been touched by our mission
            and work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full flex flex-col bg-white shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <Quote className="h-8 w-8 text-primary/40" />
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-700 italic">{testimonial.quote}</p>
                </CardContent>
                <CardFooter className="pt-4 border-t">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3 border-2 border-primary/20">
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.author}
                      />
                      <AvatarFallback>
                        {testimonial.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
