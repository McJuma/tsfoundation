import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Users, Gift, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const GetInvolvedSection = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Get Involved
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            There are many ways you can support our mission to provide a loving
            home for orphaned children. Every contribution makes a difference in
            a child's life.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Donate Card */}
          <motion.div variants={item}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-destructive" />
                </div>
                <CardTitle>Donate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Your financial support helps us provide food, shelter,
                  education, and healthcare for the children.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center pt-2">
                <Button variant="destructive" asChild>
                  <a href="/donate">Donate Now</a>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Volunteer Card */}
          <motion.div variants={item}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle>Volunteer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Share your time and skills to help with our programs, events,
                  and daily activities at the children's home.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center pt-2">
                <Button variant="outline" asChild>
                  <a href="/volunteer">Learn More</a>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Fundraise Card */}
          <motion.div variants={item}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle>Fundraise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Organize a fundraising event in your community or start an
                  online campaign to support our cause.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center pt-2">
                <Button variant="outline" asChild>
                  <a href="/fundraise">Start Fundraising</a>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Events Card */}
          <motion.div variants={item}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle>Attend Events</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Join our community events, fundraisers, and awareness programs
                  to connect with our cause.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center pt-2">
                <Button variant="outline" asChild>
                  <a href="/events">View Events</a>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default GetInvolvedSection;
