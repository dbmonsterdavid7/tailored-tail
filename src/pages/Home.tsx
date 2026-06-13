import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Sparkles, Star, Scissors, MapPin, Phone, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { BUSINESS_INFO, TESTIMONIALS, SERVICES } from '../data';
import PricingBreakdownTool from '../components/PricingBreakdownTool';

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedIndices, setLoadedIndices] = useState<number[]>([0]);

  const heroImages = [
    "https://lh3.googleusercontent.com/d/1tQxkuU4XyOdtqXXTDxVyp8lwGcMhVcQk=w800",
    "https://lh3.googleusercontent.com/d/1TvY88fV2cKi2Q7tX8LE8i4NBeOuSkZMa=w800",
    "https://lh3.googleusercontent.com/d/163uTSlwF6z6qUZ659Gq7XROPCN_WK6tx=w800",
    "https://lh3.googleusercontent.com/d/1tPWU4u7U_gHxLSXnlD76x5FJGEJ5_EoU=w800",
    "https://lh3.googleusercontent.com/d/10H0GKXytpGSgQGjmPQih8PTsKh-eWy0j=w800"
  ];

  useEffect(() => {
    // Lazily register and load the next image when carousel index moves
    setLoadedIndices((prev) => {
      if (!prev.includes(currentImageIndex)) {
        return [...prev, currentImageIndex];
      }
      return prev;
    });
  }, [currentImageIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  return (
    <div className="paw-bg-pattern min-h-screen" id="home-page">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-item text-primary-600 font-bold text-sm tracking-wide shadow-sm">
              <Sparkles className="w-4 h-4 fill-current animate-pulse text-primary-500" />
              <span>Grooming with Love & Precision Since 2002</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight font-heading">
              Where Every Tail Gets a <span className="text-primary-500 underline decoration-wavy decoration-teal-400">Tailored</span> Cut
            </h1>

            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Canton's favorite all-breed professional dog & cat grooming lounge, owned by safety-certified groomer <strong className="text-slate-800">Jaime Stanchina</strong> with {BUSINESS_INFO.stats.experienceYears}+ years of hands-on expertise.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Link
                to="/book-now"
                className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-black text-lg rounded-full shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Book Appointment</span>
              </Link>
              <Link
                to="/services"
                className="px-8 py-4 border-2 border-primary-200 text-primary-600 hover:bg-white/40 backdrop-blur-sm font-black text-lg rounded-full transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>Explore Packages</span>
              </Link>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-6 border-t border-slate-200/50 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <span className="block text-2xl font-black text-primary-600 font-heading">{BUSINESS_INFO.stats.experienceYears}+ Yrs</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">In Canton, MI</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block text-2xl font-black text-primary-600 font-heading">{BUSINESS_INFO.stats.satisfiedPets}</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Happy Tails</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block text-2xl font-black text-primary-600 font-heading">{BUSINESS_INFO.stats.rating}</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Five-Star Reviews</span>
              </div>
            </div>
          </div>

          {/* Right hero card illustrating dog/cat and key benefit badge */}
          <div className="relative mx-auto max-w-md lg:max-w-none">
            {/* Main visually cute card */}
            <div className="glass-card p-6 rounded-[2rem] shadow-xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
              {/* Image box with scrolling showcase */}
              <div className="aspect-square w-full rounded-2xl bg-neutral-900/10 overflow-hidden relative border border-white/60 shadow-inner group">
                {/* Images with preloaded DOM elements for smooth cross-fading */}
                {heroImages.map((imgUrl, i) => {
                  const isLoaded = loadedIndices.includes(i);
                  return (
                    <img
                      key={imgUrl}
                      src={isLoaded ? imgUrl : undefined}
                      alt={`Signature Grooming Style ${i + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                        i === currentImageIndex 
                          ? 'opacity-100 scale-100' 
                          : 'opacity-0 scale-105 pointer-events-none'
                      }`}
                      referrerPolicy="no-referrer"
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                  );
                })}

                {/* Ambient dark gradient overlay at the bottom for readability of indicators/controls */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent pointer-events-none z-10" />

                {/* Highly cute badge on top */}
                <div className="absolute top-4 right-4 glass-item px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-800 shadow-md border border-white/80 z-20">
                  💖 Jaime's Signature Styles
                </div>

                {/* Left/Right manual navigation arrows */}
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/70 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 duration-300 z-20 focus:opacity-105 pointer-events-auto cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                </button>

                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/70 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100 duration-300 z-20 focus:opacity-105 pointer-events-auto cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </button>

                {/* Indicators / Dot pagination */}
                <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2 z-20">
                  {heroImages.map((_, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setCurrentImageIndex(i);
                      }}
                      className={`h-2 rounded-full transition-all duration-300 pointer-events-auto cursor-pointer ${
                        i === currentImageIndex 
                          ? 'w-6 bg-white' 
                          : 'w-2 bg-white/50 hover:bg-white/80'
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Consultation reminder below card */}
              <div className="mt-4 flex items-center gap-3 glass-item p-4 rounded-2xl">
                <div className="p-2.5 bg-primary-500 text-white rounded-xl">
                  <Heart className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Pet drop-off consultation included</h4>
                  <p className="text-xs text-slate-500">Every grooming begins with a personalized physical and visual coat inspection.</p>
                </div>
              </div>
            </div>

            {/* Quick floating indicators around image */}
            <div className="absolute -top-6 -left-6 glass-item py-3 px-5 rounded-2xl shadow-lg flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-bold text-slate-705">CPR Certified</span>
            </div>
            <div className="absolute -bottom-6 -right-6 glass-item py-3 px-5 rounded-2xl shadow-lg flex items-center gap-2">
              <span className="text-lg">🏥</span>
              <span className="text-xs font-bold text-slate-705">Partnered with Alsager Clinic</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES QUICK SUMMARY */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading">
            Our Loving Grooming Packages
          </h2>
          <p className="text-slate-650 mt-3 text-lg">
            We provide everything your pet needs to thrive under the hands of seasoned professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {SERVICES.map((pkg) => (
            <div key={pkg.id} className="glass-card rounded-[2rem] p-8 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/60 rounded-2xl text-primary-500 border border-white/80">
                    <Scissors className="w-6 h-6 rotate-45" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-wider text-primary-600 bg-primary-100/60 px-3.5 py-1 rounded-full border border-white/40">
                    Est. Duration: {pkg.duration}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 font-heading mb-2">{pkg.name}</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed">{pkg.description}</p>

                <div className="space-y-2 mb-8">
                  {pkg.includes.slice(0, 4).map((inc, i) => {
                    const isOnRequest = inc.toLowerCase().includes('(on request)');
                    return (
                      <div key={i} className="flex gap-2 text-sm text-slate-600 items-start">
                        {isOnRequest ? (
                          <Star className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0 mt-0.5" />
                        ) : (
                          <span className="text-primary-500 font-bold shrink-0">✓</span>
                        )}
                        <span>{inc}</span>
                      </div>
                    );
                  })}
                  <p className="text-xs text-primary-500 font-bold italic pt-2">+ click to view full details list on Services page...</p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200/50 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400 block font-bold">Estimated Base Price</span>
                  <span className="text-2xl font-black text-slate-800">From ${pkg.basePrice}</span>
                </div>
                <Link
                  to="/services"
                  className="px-5 py-2.5 bg-white/70 hover:bg-white/95 text-slate-800 border border-white/50 shadow-sm font-bold text-sm rounded-full duration-300"
                >
                  View Prices By Size
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. DYNAMIC INTERACTIVE PRICING CALCULATOR SECTION */}
      <section className="bg-primary-500 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-white" id="pricing-calculator-section">
        {/* Playful paw print overlays */}
        <div className="absolute top-4 left-4 text-white/5 text-9xl">🐾</div>
        <div className="absolute bottom-4 right-4 text-white/5 text-9xl">🐾</div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6 mb-12">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-white border border-white/30">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
            <span>Exclusively at The Tailored Tail</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading leading-tight max-w-3xl mx-auto text-white">
            Estimate Your Grooming Total Instantly
          </h2>

          <p className="text-base md:text-lg text-pink-50/90 max-w-2xl mx-auto">
            Choose your pet size, preferences, and gentle-care add-ons to see custom estimated pricing instantly. Transparent quotes are evaluated during check-in!
          </p>
        </div>

        <div className="relative z-10">
          <PricingBreakdownTool />
        </div>
      </section>

      {/* 4. WHY WE STAND OUT */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading">
            Designed for Trust. Built for Comfort.
          </h2>
          <p className="text-slate-650 mt-2 text-lg">
            What makes our Canton salon the ultimate choice for your fur babies?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="glass-card p-8 rounded-[2rem] shadow-sm space-y-4">
            <div className="w-12 h-12 glass-item text-primary-500 rounded-2xl flex items-center justify-center font-bold text-xl">
              🏅
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 font-heading">24.5+ Years Experience</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Jaime Stanchina's lifelong journey began grooming at age 14. For nearly a quarter-century, she has specialized in trending pet styles so you invest with confidence.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-card p-8 rounded-[2rem] shadow-sm space-y-4">
            <div className="w-12 h-12 glass-item text-secondary-500 rounded-2xl flex items-center justify-center font-bold text-xl">
              🏥
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 font-heading">CPR & Safety First</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Safety isn't an afterthought. Apart from pet CPR credentials, we maintain active professional alignment with Alsager Animal Care Center to bypass any concerns.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-card p-8 rounded-[2rem] shadow-sm space-y-4">
            <div className="w-12 h-12 glass-item rounded-2xl flex items-center justify-center font-bold text-xl">
              🐶
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 font-heading">All Breeds Welcome</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              From giant curly Bernedoodles to small delicate Persian cats. We employ specialized customized bathing, nail grinding, and scissoring gear matching every pet.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CLIENT TESTIMONIALS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-white/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-heading">
              Stories from Happy Tails in Canton
            </h2>
            <p className="text-slate-650 mt-2">
              Read how much local pet owners appreciate Jaime's meticulous, loving touch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="glass-card p-8 rounded-[2rem] shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm italic leading-relaxed mb-6">
                    "{t.text}"
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200/40">
                  <div className="w-10 h-10 rounded-full glass-item flex items-center justify-center font-bold text-secondary-600 text-lg">
                    🐾
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{t.author}</h4>
                    <p className="text-xs text-slate-500">{t.petName} ({t.petBreed})</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION CONTAINER */}
      <section className="py-20 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-primary-400 to-primary-600 text-white p-8 md:p-12 rounded-[2rem] shadow-xl space-y-6 relative overflow-hidden border border-white/30">
          <div className="absolute -top-10 -right-10 text-white/5 text-[15rem] pointer-events-none">🐱</div>
          <h2 className="text-3xl md:text-4xl font-black font-heading leading-tight">
            Ready to pamper your precious pet?
          </h2>
          <p className="text-primary-50/90 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Get an instant custom quote estimate and select your preferred date slot! Submit details in 1 minute and we'll handle the rest.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/book-now"
              className="px-8 py-4 bg-white text-primary-600 hover:bg-secondary-50 font-black text-lg rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
            >
              Book Now Online
            </Link>
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="px-8 py-4 border-2 border-white/60 hover:bg-white/10 text-white font-black text-lg rounded-full transition-transform duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              <span>Call {BUSINESS_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
