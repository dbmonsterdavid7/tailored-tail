import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Lazy load route pages for high page speed and dynamic bundle splitting (limits initial load blocks)
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const BookNow = lazy(() => import('./pages/BookNow'));

// Soft, responsive loading indicator so the user is never left with a blank screen
function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-12">
      <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mb-4" />
      <span className="text-xs font-black uppercase tracking-wider text-slate-400 animate-pulse">
        Loading Sweet Content...
      </span>
    </div>
  );
}

// Scroll restoration component to move back to top on path change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-[#f9f5f2] text-slate-800 relative overflow-x-clip overflow-y-visible">
        {/* Soft Background Decor Blurs */}
        <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-pink-200/50 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-[200px] right-[-100px] w-[500px] h-[500px] bg-teal-100/40 rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="absolute top-[40%] left-[20%] w-80 h-80 bg-rose-100/30 rounded-full blur-[100px] pointer-events-none z-0" />
        
        <div className="relative z-10 flex flex-col flex-grow">
          <ScrollToTop />
          <Navbar />
          
          {/* Main Content Stage */}
          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/book-now" element={<BookNow />} />
                <Route path="*" element={<Home />} /> {/* Failback route */}
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}
