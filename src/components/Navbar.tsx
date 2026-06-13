import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scissors, Menu, X, Heart } from 'lucide-react';
import { BUSINESS_INFO } from '../data';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact & FAQ', path: '/contact' },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 glass-nav shadow-sm" id="site-header">
      {/* Top micro bar for quick urgency info */}
      <div className="bg-primary-500 text-white py-1.5 px-4 text-xs md:text-sm font-medium text-center flex items-center justify-center gap-2 overflow-hidden">
        {/* Desktop Layout - static centered text */}
        <div className="hidden md:flex items-center justify-center gap-2">
          <Heart className="w-4 h-4 fill-current animate-pulse text-white shrink-0" />
          <span>Owner is Pet CPR Certified &amp; 24+ Years Pet Grooming Experience!</span>
          <span className="font-bold">|</span>
          <span>Call now to secure slot: <a href={`tel:${BUSINESS_INFO.phone}`} className="underline font-bold hover:text-secondary-100">{BUSINESS_INFO.phoneDisplay}</a></span>
        </div>

        {/* Mobile Layout - continuous scrolling single line text */}
        <div className="flex md:hidden w-full overflow-hidden whitespace-nowrap relative select-none">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-10">
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider shrink-0">
              <Heart className="w-3.5 h-3.5 fill-current text-white shrink-0 animate-pulse" />
              Owner is Pet CPR Certified &amp; 24+ Years Pet Grooming Experience! &nbsp;&nbsp;|&nbsp;&nbsp; Call now: <a href={`tel:${BUSINESS_INFO.phone}`} className="underline font-bold">{BUSINESS_INFO.phoneDisplay}</a>
            </span>
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider shrink-0" aria-hidden="true">
              <Heart className="w-3.5 h-3.5 fill-current text-white shrink-0 animate-pulse" />
              Owner is Pet CPR Certified &amp; 24+ Years Pet Grooming Experience! &nbsp;&nbsp;|&nbsp;&nbsp; Call now: <a href={`tel:${BUSINESS_INFO.phone}`} className="underline font-bold">{BUSINESS_INFO.phoneDisplay}</a>
            </span>
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider shrink-0" aria-hidden="true">
              <Heart className="w-3.5 h-3.5 fill-current text-white shrink-0 animate-pulse" />
              Owner is Pet CPR Certified &amp; 24+ Years Pet Grooming Experience! &nbsp;&nbsp;|&nbsp;&nbsp; Call now: <a href={`tel:${BUSINESS_INFO.phone}`} className="underline font-bold">{BUSINESS_INFO.phoneDisplay}</a>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo container */}
          <Link to="/" onClick={handleLinkClick} className="flex items-center group">
            <div className="duration-300 group-hover:scale-105 flex items-center justify-center">
              <img 
                src="https://lh3.googleusercontent.com/d/1VQMqYCXwl7nUe7X-8B2XKCFdVxfzltqK=w250" 
                alt="The Tailored Tail Logo" 
                className="h-16 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`relative py-2 text-base font-semibold transition-all duration-300 ${
                    isActive(item.path)
                      ? 'text-primary-500 font-bold'
                      : 'text-gray-600 hover:text-primary-400'
                  }`}
                >
                  {item.name}
                  {isActive(item.path) && (
                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-primary-500 rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            <Link
              to="/book-now"
              onClick={handleLinkClick}
              className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-full shadow-lg shadow-primary-200 hover:shadow-primary-300 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
              id="desktop-book-btn"
            >
              <span>Book Appointment</span>
            </Link>
          </nav>

          {/* Mobile hamburger menu */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-primary-500 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/80 backdrop-blur-md border-t border-white/40 px-4 py-6 space-y-4 shadow-xl">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleLinkClick}
                className={`px-4 py-3 rounded-xl font-bold text-lg transition-all ${
                  isActive(item.path)
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-55/65'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 border-t border-gray-250/20 flex flex-col gap-3">
            <Link
              to="/book-now"
              onClick={handleLinkClick}
              className="w-full text-center py-4 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-full shadow-md text-lg transition-all"
              id="mobile-book-btn"
            >
              Book Appointment
            </Link>
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="w-full text-center py-3 border-2 border-primary-200 text-primary-500 hover:bg-primary-50 font-bold rounded-full text-lg transition-all flex items-center justify-center gap-2"
            >
              Call Us: {BUSINESS_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
