import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Heart, Scissors } from 'lucide-react';
import { BUSINESS_INFO } from '../data';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-300 border-t-8 border-primary-400" id="site-footer">
      {/* Decorative top section */}
      <div className="bg-gray-800/50 py-8 px-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <img 
              src="https://lh3.googleusercontent.com/d/1VQMqYCXwl7nUe7X-8B2XKCFdVxfzltqK=w250" 
              alt="The Tailored Tail Logo" 
              width="250"
              height="64"
              className="h-16 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <div>
              <h4 className="text-primary-300 text-lg font-bold font-heading">The Tailored Tail Pet Grooming</h4>
              <p className="text-xs text-gray-400">All breed professional dog and cat grooming in Canton, MI.</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/book-now"
              onClick={handleScrollToTop}
              className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-full text-sm duration-300"
            >
              Get Estimated Prices & Book
            </Link>
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="px-6 py-3 border border-gray-600 hover:border-gray-400 text-white font-bold rounded-full text-sm duration-300"
            >
              Call Groomer: {BUSINESS_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 - Brand pitch */}
          <div className="space-y-4">
            <h3 className="text-primary-300 text-xl font-bold font-heading">Our Passion</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              At The Tailored Tail, furry tails wag with joy and every pooch prances in with a pep! 
              We've been serving local families for over 24 years, keeping your best friends cute, healthy, and happy.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-gray-400">
              <Heart className="w-4 h-4 fill-primary-500 text-primary-500 animate-pulse" />
              <span>Pet CPR & Safety Certified</span>
            </div>
          </div>

          {/* Column 2 - Useful quicklinks */}
          <div>
            <h3 className="text-primary-300 text-xl font-bold font-heading mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" onClick={handleScrollToTop} className="hover:text-primary-400 duration-200 block py-1">
                  Home Landing
                </Link>
              </li>
              <li>
                <Link to="/services" onClick={handleScrollToTop} className="hover:text-primary-400 duration-200 block py-1">
                  Grooming Services
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={handleScrollToTop} className="hover:text-primary-400 duration-200 block py-1">
                  About Owner & Jaime
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={handleScrollToTop} className="hover:text-primary-400 duration-200 block py-1">
                  Contact Us & FAQs
                </Link>
              </li>
              <li>
                <Link to="/book-now" onClick={handleScrollToTop} className="hover:text-primary-400 duration-200 font-bold block py-1 text-primary-300">
                  Book Appointment Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Operating Hours */}
          <div>
            <h3 className="text-primary-300 text-xl font-bold font-heading mb-4">Hours of Operation</h3>
            <ul className="space-y-3 text-sm">
              {BUSINESS_INFO.workingHours.map((row, idx) => (
                <li key={idx} className="flex justify-between items-center text-gray-400 border-b border-gray-800 pb-1.5">
                  <span className="font-semibold text-gray-300">{row.day}</span>
                  <span>{row.hours}</span>
                </li>
              ))}
              <li className="text-xs text-gray-500 italic pt-1">
                * Drop-offs scheduled early morning. Consultation directly at check-in.
              </li>
            </ul>
          </div>

          {/* Column 4 - Reach us */}
          <div className="space-y-4">
            <h3 className="text-primary-300 text-xl font-bold font-heading">Find Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-primary-400 shrink-0 mt-0.5" />
                <span className="text-gray-400 hover:text-white duration-200">
                  {BUSINESS_INFO.address}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-5 h-5 text-primary-400 shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phone}`} className="text-gray-400 hover:text-white duration-200">
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-5 h-5 text-primary-400 shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="text-gray-400 hover:text-white duration-200 break-all text-xs">
                  {BUSINESS_INFO.email}
                </a>
              </li>
            </ul>
            <div className="pt-2">
              <a
                href={BUSINESS_INFO.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg text-sm duration-300"
              >
                <span>Follow us on Facebook</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer bottom credit note */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500 space-y-2">
          <p>© {new Date().getFullYear()} {BUSINESS_INFO.name}. All Rights Reserved.</p>
          <p>
            Jaime is CPR certified. Professional relationship with Alsager Animal Care Center.
          </p>
        </div>
      </div>
    </footer>
  );
}
