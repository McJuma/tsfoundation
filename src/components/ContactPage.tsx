import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    alert("Your message has been sent. We'll get back to you soon!");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-primary">Contact Us</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            We'd love to hear from you. Reach out to us with any questions,
            suggestions, or if you'd like to get involved with our mission.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as
                possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input id="phone" type="tel" placeholder="+254 7XX XXX XXX" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Your message here..."
                    rows={5}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
          {/* card with embedde map */}

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Our Contact Information</CardTitle>
                <CardDescription>
                  Here's how you can reach us directly.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Address</h3>
                    <p className="text-gray-600">
                      Mombasa Road, Imara Daima
                      <br />
                      Nairobi City
                      <br />
                      Kenya
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-gray-600">
                      <a href="tel:0727842858" className="hover:text-primary">
                        Call Tasha
                      </a><br />
                      <a href="tel:0727415161" className="hover:text-primary">
                        Call Sasha
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-gray-600">
                      <a
                        href="mailto:info@tashasashafoundation.org"
                        className="hover:text-primary"
                      >
                        info@tashasashafoundation.org
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Office Hours</CardTitle>
                <CardDescription>
                  When you can visit or call us.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>9:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-primary text-primary-foreground rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Get Involved</h3>
              <p className="mb-4">
                Interested in volunteering or partnering with us? We'd love to
                hear from you!
              </p>
              <Button
                variant="outline"
                className="bg-white text-primary hover:bg-white/90"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 max-w-6xl mx-auto">
          <Card className="shadow-md overflow-hidden">
            <CardHeader>
              <CardTitle>Find Us</CardTitle>
              <CardDescription>
                Visit our location in Nairobi, Kenya
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3796.588521123333!2d36.880599249999996!3d-1.322758749999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f123cef3e30ad%3A0x3a6d8c2e357196b3!2sImara%20Daima%20Estate%2C%20Nairobi%2C%20Kenya!5e1!3m2!1sen!2snl!4v1744278003813!5m2!1sen!2snl" 
                width="100%" height="450" style={{border: "0"}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                {/* Replace with actual map integration */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
