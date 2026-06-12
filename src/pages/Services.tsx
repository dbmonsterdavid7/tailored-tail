import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scissors, Sparkles, Smile, ShieldAlert, BadgeCheck, HelpCircle, Star } from 'lucide-react';
import { SERVICES, ADD_ONS, BUSINESS_INFO } from '../data';

export default function Services() {
  const navigate = useNavigate();
  
  // Interactive Price Estimator State
  const [petType, setPetType] = useState<'dog' | 'cat'>('dog');
  const [petSize, setPetSize] = useState<'small' | 'medium' | 'large' | 'giant'>('small');
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);

  // Base pricing matrix formulas based on genuine business structures
  const calculatePackagePrice = (packageId: string): number => {
    let price = packageId === 'full-groom' ? 65 : 40;
    
    // Type modifiers
    if (petType === 'cat') {
      price += 15; // Cats are slightly more delicate/specialized
    }

    // Size modifiers
    switch (petSize) {
      case 'medium':
        price += 15;
        break;
      case 'large':
        price += 35;
        break;
      case 'giant':
        price += 60;
        break;
      case 'small':
      default:
        // base price
        break;
    }

    return price;
  };

  const handleAddOnToggle = (id: string) => {
    if (selectedAddOnIds.includes(id)) {
      setSelectedAddOnIds(selectedAddOnIds.filter(item => item !== id));
    } else {
      setSelectedAddOnIds([...selectedAddOnIds, id]);
    }
  };

  const getTotalAddOnsPrice = (): number => {
    return selectedAddOnIds.reduce((total, id) => {
      const match = ADD_ONS.find(ao => ao.id === id);
      return total + (match ? match.price : 0);
    }, 0);
  };

  const handleBookWithEstimates = (packageName: string) => {
    // Navigate to book-now with state so the form pre-fills dynamically!
    navigate('/book-now', {
      state: {
        petType,
        petSize,
        serviceType: packageName,
        addOnIds: selectedAddOnIds
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="paw-bg-pattern min-h-screen py-12 px-4 sm:px-6 lg:px-8" id="services-page">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Top Header Card */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs uppercase font-black tracking-widest text-primary-600 bg-primary-100/60 border border-white/45 px-4 py-1.5 rounded-full inline-block">
            Grooming Menu & Estimates
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 font-heading">
            Tailored Grooming Packages
          </h1>
          <p className="text-slate-600 text-lg">
            Every booking includes a pre-commencement visual consultation. Pricing varies slightly based on coat thickness and overall temperament.
          </p>
        </div>

        {/* 1. DETAILED CORE PACKAGES CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((pkg) => (
            <div key={pkg.id} className="glass-card rounded-[2rem] p-8 shadow-xl relative flex flex-col justify-between">
              
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-slate-205/30">
                  <div className="flex items-center gap-3">
                    <div className="p-3.5 bg-primary-500 text-white rounded-2xl">
                      <Scissors className="w-6 h-6 rotate-45" />
                    </div>
                    <h2 className="text-2xl font-extrabold text-slate-950 font-heading">{pkg.name}</h2>
                  </div>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">{pkg.description}</p>

                <div className="space-y-3 glass-item p-5 rounded-2xl">
                  <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">What's Included:</h4>
                  <ul className="grid grid-cols-1 gap-2.5">
                    {pkg.includes.map((incl, idx) => {
                      const isOnRequest = incl.toLowerCase().includes('(on request)');
                      return (
                        <li key={idx} className="flex gap-2 text-sm text-slate-705 items-start">
                          {isOnRequest ? (
                            <Star className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0 mt-0.5" />
                          ) : (
                            <span className="text-primary-500 font-black shrink-0">✓</span>
                          )}
                          <span>{incl}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-205/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400 block font-bold uppercase tracking-wider">Estimated Starting Price</span>
                  <span className="text-3xl font-black text-slate-900 font-heading">From ${pkg.basePrice}</span>
                  <span className="text-[10px] text-slate-400 block font-bold">Estimated duration: {pkg.duration}</span>
                </div>
                <button
                  onClick={() => handleBookWithEstimates(pkg.name)}
                  className="px-6 py-3.5 bg-primary-500 hover:bg-primary-600 text-white font-black text-sm rounded-full shadow-lg shadow-primary-200 duration-300 hover:scale-102"
                >
                  Book This Package
                </button>
              </div>

            </div>
          ))}
        </section>

        {/* 2. DYNAMIC LIVE CALCULATOR ESTIMATOR */}
        <section className="glass-card p-8 md:p-12 rounded-[2rem] shadow-2xl" id="price-estimator">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left selector metrics column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase font-black tracking-widest text-primary-500">Interactive Tool</span>
                <h3 className="text-3xl font-black text-slate-900 font-heading">Estimate Your Custom Total</h3>
                <p className="text-slate-500 text-sm">
                  Select your pet's criteria and add-on services to see immediate custom price targets.
                </p>
              </div>

              {/* Selector 1: Pet type toggling */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">1. Select Pet Type</label>
                <div className="grid grid-cols-2 gap-3 max-w-sm">
                  <button
                    onClick={() => setPetType('dog')}
                    className={`p-3 rounded-2xl font-bold border transition-all text-sm flex items-center justify-center gap-2 ${
                      petType === 'dog'
                        ? 'bg-primary-500 text-white border-primary-500 shadow-md'
                        : 'bg-white/60 text-slate-600 border-white/85 hover:bg-white-80 shadow-sm'
                    }`}
                  >
                    <span>🐶 Dog</span>
                  </button>
                  <button
                    onClick={() => setPetType('cat')}
                    className={`p-3 rounded-2xl font-bold border transition-all text-sm flex items-center justify-center gap-2 ${
                      petType === 'cat'
                        ? 'bg-primary-500 text-white border-primary-500 shadow-md'
                        : 'bg-white/60 text-slate-600 border-white/85 hover:bg-white-80 shadow-sm'
                    }`}
                  >
                    <span>🐱 Cat</span>
                  </button>
                </div>
              </div>

              {/* Selector 2: Pet Size */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-705">2. Select Pet Size / Weight Class</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'small', label: 'Small', desc: 'Under 15 lbs' },
                    { id: 'medium', label: 'Medium', desc: '15 - 40 lbs' },
                    { id: 'large', label: 'Large', desc: '40 - 75 lbs' },
                    { id: 'giant', label: 'Giant', desc: '75+ lbs' }
                  ].map((sz) => (
                    <button
                      key={sz.id}
                      onClick={() => setPetSize(sz.id as any)}
                      className={`p-3 rounded-2xl font-bold border transition-all text-left flex flex-col items-center justify-center text-xs ${
                        petSize === sz.id
                          ? 'bg-secondary-500 text-white border-secondary-500 shadow-sm font-bold'
                          : 'bg-white/60 text-slate-600 border-white/85 hover:bg-white/80'
                      }`}
                    >
                      <span className="font-extrabold text-sm">{sz.label}</span>
                      <span className="opacity-80 block text-[9px] font-medium">{sz.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector 3: Add Ons */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-705">3. Select Optional Upgrades & Add-ons</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ADD_ONS.map((ao) => {
                    const isChecked = selectedAddOnIds.includes(ao.id);
                    return (
                      <div
                        key={ao.id}
                        onClick={() => handleAddOnToggle(ao.id)}
                        className={`p-4 rounded-2xl border cursor-pointer select-none transition-all flex items-start gap-3 ${
                          isChecked
                            ? 'bg-primary-100/40 border-primary-300 shadow-inner'
                            : 'bg-white/50 border-white/70 hover:bg-white/85'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // Swallowed: div click takes care
                          className="mt-1 h-4 w-4 accent-primary-500 rounded cursor-pointer shrink-0"
                        />
                        <div>
                          <div className="flex justify-between items-center gap-2">
                            <span className="font-bold text-xs text-slate-800">{ao.name}</span>
                            <span className="font-black text-xs text-primary-600 shrink-0">+${ao.price}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 mt-1 leading-tight">{ao.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right breakdown estimated total panel */}
            <div className="lg:col-span-5 glass-card p-6 rounded-[2rem] border-white/30 shadow-xl space-y-6 lg:sticky lg:top-24">
              <h4 className="text-xl font-black text-slate-900 font-heading border-b border-slate-205/30 pb-3">Price Breakdown</h4>

              <div className="space-y-4 text-xs font-semibold text-slate-600">
                
                {/* 1. Full Package prices */}
                <div className="flex justify-between items-center">
                  <span>Full Service Grooming Package (est.)</span>
                  <span className="font-bold text-slate-800 text-sm">${calculatePackagePrice('full-groom')}</span>
                </div>
                
                {/* 2. Bath Brush packages */}
                <div className="flex justify-between items-center">
                  <span>Bath & Brush Package (est.)</span>
                  <span className="font-bold text-slate-800 text-sm">${calculatePackagePrice('bath-brush')}</span>
                </div>

                {/* 3. Add-ons subtotals */}
                {selectedAddOnIds.length > 0 && (
                  <div className="pt-2 border-t border-dashed border-slate-205/30 space-y-2">
                    <span className="block text-[10px] uppercase text-slate-400">Chosen Upgrades:</span>
                    {selectedAddOnIds.map((id) => {
                      const match = ADD_ONS.find(ao => ao.id === id);
                      return match ? (
                        <div key={id} className="flex justify-between text-slate-500 italic pl-2">
                          <span>+ {match.name}</span>
                          <span>${match.price}</span>
                        </div>
                      ) : null;
                    })}
                    <div className="flex justify-between text-slate-700 font-bold border-t border-dashed border-primary-100/50 pt-2">
                      <span>Upgrades Subtotal</span>
                      <span>+${getTotalAddOnsPrice()}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* ESTIMATE PANELS */}
              <div className="pt-4 border-t border-slate-205/30 space-y-4">
                
                <div className="glass-item p-4 rounded-2xl text-center shadow-inner">
                  <span className="text-[10px] text-primary-500 block uppercase font-black tracking-widest mb-1 leading-none">
                    Grooming Total Estimate
                  </span>
                  <span className="text-4xl font-black text-primary-600 font-heading block">
                    ${calculatePackagePrice('full-groom') + getTotalAddOnsPrice()}
                  </span>
                  <p className="text-[9px] text-slate-400 mt-1 block font-medium">
                    Includes premium brushing, trim, bathing, blow-dry, nails, glands, and selected upgrades.
                  </p>
                </div>

                <div className="glass-item p-4 rounded-2xl text-center">
                  <span className="text-[10px] text-slate-500 block uppercase font-black tracking-widest mb-1 leading-none">
                    Bath & Brush Total Estimate
                  </span>
                  <span className="text-3xl font-black text-slate-800 font-heading block">
                    ${calculatePackagePrice('bath-brush') + getTotalAddOnsPrice()}
                  </span>
                </div>

                {/* Book this combination directly */}
                <button
                  onClick={() => handleBookWithEstimates('Full Service Grooming')}
                  className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white font-black rounded-full shadow-lg shadow-primary-200 text-sm text-center duration-300 block transform hover:-translate-y-0.5"
                >
                  Book Full Grooming Package
                </button>
                
                <button
                  onClick={() => handleBookWithEstimates('Bath & Brush')}
                  className="w-full py-3 bg-white hover:bg-slate-50 text-slate-950 font-bold rounded-full text-xs text-center border border-slate-200 duration-300 block"
                >
                  Book Bath & Brush Instead
                </button>
              </div>

            </div>

          </div>
        </section>

        {/* 3. SAFETY NOTICE */}
        <section className="glass-card p-6 md:p-8 rounded-[2rem] flex items-start gap-4 shadow-sm">
          <div className="p-3 bg-rose-50 text-rose-500 rounded-xl font-bold shrink-0">⚠️</div>
          <div>
            <h4 className="text-lg font-bold text-slate-900 font-heading">A Quick Note on Specialized Pricing Variability</h4>
            <p className="text-slate-600 text-sm mt-1 leading-relaxed">
              Base values described here are highly accurate general targets. Extremely matted coats, ticks/fleas, double thick coats (such as adult Samoyeds or Chow Chows), or highly aggressive pets may receive slightly modified custom prices. Jaime evaluates everything transparently at check-in with your complete authorization.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
