import { Link } from "react-router-dom";
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  // TikTok,
} from "lucide-react";
import { Separator } from "./ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <p><img src="src/assets/images/logo.png" alt="Logo" className="h-20 w-20 mr-2" /></p>
            <div className="flex items-center mb-4">
              {/* <Heart className="h-6 w-6 text-destructive mr-2" /> */}
              <p className="text-xl font-bold">TashaSashaFoundation</p>
            </div>
            <p className="text-sm mb-4">
              TashaSashaFoundation is a non-profit organization dedicated to improving lives through education, healthcare, and community development programs.
            </p>
            <p>
              <a href="/donate" className="bg-blue-500 rounded-md hover:bg-white text-black px-4 py-2">Donate Now</a>
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/vision" className="text-sm hover:underline">
                  Our Vision
                </Link>
              </li>
              <li>
                <Link to="/get-involved" className="text-sm hover:underline">
                  Get Involved
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-sm hover:underline">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <a
                  href="mailto:info@tashasashafoundation.org"
                  className="text-sm hover:underline"
                >
                  info@tashasashafoundation.org
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <a href="tel:+1234567890" className="text-sm hover:underline">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-1" />
                <span className="text-sm">
                  Mombasa Road, Imara Daima
                  <br />
                  Nairobi City
                  <br />
                  Kenya
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                style={{ backgroundColor: "blue", color: "white", borderRadius: "50%" }}
                href="https://www.facebook.com/share/19LthXk8b6/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-destructive transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
                <a
                href="https://www.tiktok.com/@tashasashafoundation23?_t=ZM-8vCaa2AgbyB&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-destructive transition-colors"
                >
                <img
                  src="../src/assets/images/Tiktoklogo.png"
                  alt="TikTok"
                  className="h-6 w-6 rounded-full"
                />
                </a>
              <a
                href="https://www.instagram.com/tashasashafoundation?igsh=MTBmdXluNXMycTRocA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-destructive transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              {/* <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-destructive transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a> */}
            </div>
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">
                Subscribe to our newsletter
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 text-sm text-black rounded-l-md w-full focus:outline-none"
                />
                <button className="bg-destructive text-destructive-foreground px-3 py-2 text-sm rounded-r-md hover:bg-destructive/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6 bg-primary-foreground/20" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs">
            &copy; 2023 TashaSashaFoundation. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-xs hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-xs hover:underline">
              Terms of Service
            </Link>
            <Link to="/cookie-policy" className="text-xs hover:underline">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
