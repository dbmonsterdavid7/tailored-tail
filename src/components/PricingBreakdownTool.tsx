import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADD_ONS } from '../data';
import { Calculator, Star, Sparkles, Check, ChevronRight } from 'lucide-react';

export default function PricingBreakdownTool() {
  const navigate = useNavigate();

  // State
  const [petType, setPetType] = useState<'dog' | 'cat'>('dog');
  const [petSize, setPetSize] = useState<'small' | 'medium' | 'large' | 'giant'>('small');
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);

  // Base pricing matrix formulas
  const calculatePackagePrice = (packageId: string): number => {
    let price = packageId === 'full-groom' ? 65 : 40;

    // Type modifiers
    if (petType === 'cat') {
      price += 15; // Cats are slightly more delicate
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

  const fullGroomTotal = calculatePackagePrice('full-groom') + getTotalAddOnsPrice();
  const bathBrushTotal = calculatePackagePrice('bath-brush') + getTotalAddOnsPrice();

  return (
    <div className="w-full max-w-5xl mx-auto rounded-[2rem] bg-white text-slate-800 shadow-2xl overflow-hidden border border-slate-100" id="interactive-price-calculator">
      {/* Tool Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 md:p-8 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary-500/20 text-primary-400 rounded-xl">
            <Calculator className="w-6 h-6 shrink-0" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold font-heading text-white">Interactive Price Breakdown</h3>
            <p className="text-slate-400 text-xs mt-0.5">Customize your pet's details below for a transparent, live estimation.</p>
          </div>
        </div>
        <div className="inline-flex items-center gap-1 bg-primary-500/10 text-primary-400 px-3 py-1 rounded-full text-xs font-bold border border-primary-500/20 self-start md:self-auto">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Calculated instantly</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Interactive selectors */}
        <div className="lg:col-span-7 p-6 md:p-8 space-y-6">
          
          {/* Selector 1: Pet Type */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 block">1. Select Pet Type</label>
            <div className="grid grid-cols-2 gap-3 max-w-md">
              <button
                type="button"
                onClick={() => setPetType('dog')}
                className={`py-3.5 px-5 rounded-2xl font-bold border transition-all text-sm flex items-center justify-center gap-2.5 ${
                  petType === 'dog'
                    ? 'bg-primary-500 text-white border-primary-500 shadow-lg shadow-primary-500/10'
                    : 'bg-slate-50 text-slate-650 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <span className="text-xl">🐶</span>
                <span>Dog Grooming</span>
              </button>
              <button
                type="button"
                onClick={() => setPetType('cat')}
                className={`py-3.5 px-5 rounded-2xl font-bold border transition-all text-sm flex items-center justify-center gap-2.5 ${
                  petType === 'cat'
                    ? 'bg-primary-500 text-white border-primary-500 shadow-lg shadow-primary-500/10'
                    : 'bg-slate-50 text-slate-650 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <span className="text-xl">🐱</span>
                <span>Cat Grooming</span>
              </button>
            </div>
          </div>

          {/* Selector 2: Pet Size / weight */}
          <div className="space-y-2.5">
            <label className="text-sm font-bold text-slate-700 block">2. Select Pet Size / Weight Class</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'small', label: 'Small', desc: 'Under 15 lbs' },
                { id: 'medium', label: 'Medium', desc: '15 - 40 lbs' },
                { id: 'large', label: 'Large', desc: '40 - 75 lbs' },
                { id: 'giant', label: 'Giant', desc: '75+ lbs' }
              ].map((sz) => (
                <button
                  type="button"
                  key={sz.id}
                  onClick={() => setPetSize(sz.id as any)}
                  className={`p-3 rounded-2xl font-bold border transition-all text-left flex flex-col justify-between min-h-[72px] ${
                    petSize === sz.id
                      ? 'bg-secondary-500 text-white border-secondary-500 shadow-md shadow-secondary-500/10'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <span className="font-bold text-xs uppercase tracking-wider block">{sz.label}</span>
                  <span className="opacity-90 text-[10px] block font-medium mt-1">{sz.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Selector 3: Optional Upgrades */}
          <div className="space-y-3 pt-2">
            <label className="text-sm font-bold text-slate-700 block">3. Add Optional Treats & Care Upgrades</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ADD_ONS.map((ao) => {
                const isChecked = selectedAddOnIds.includes(ao.id);
                return (
                  <div
                    key={ao.id}
                    onClick={() => handleAddOnToggle(ao.id)}
                    className={`p-4 rounded-xl border cursor-pointer select-none transition-all flex items-start gap-3 ${
                      isChecked
                        ? 'bg-secondary-50/50 border-secondary-200 shadow-sm'
                        : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                    }`}
                  >
                    <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                      isChecked ? 'bg-secondary-500 border-secondary-500 text-white' : 'border-slate-300 bg-white'
                    }`}>
                      {isChecked && <Check className="w-2.5 h-2.5 stroke-[4px]" />}
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex justify-between items-center gap-1">
                        <span className="font-bold text-xs text-slate-800">{ao.name}</span>
                        <span className="font-bold text-xs text-secondary-600 shrink-0">+${ao.price}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-normal">{ao.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right side live results breakdown card */}
        <div className="lg:col-span-5 bg-slate-50 p-6 md:p-8 border-t lg:border-t-0 lg:border-l border-slate-100 flex flex-col justify-between">
          <div className="space-y-6">
            <h4 className="text-base font-bold text-slate-950 font-heading border-b border-slate-200 pb-2.5">Estimates Breakdown</h4>

            {/* Matrix details */}
            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between items-center text-slate-600 font-medium">
                <span>Base Package Rate ({petType === 'cat' ? 'Cat' : 'Dog'} - {petSize})</span>
                <span className="font-bold text-slate-800">${calculatePackagePrice('bath-brush')}</span>
              </div>
              
              {selectedAddOnIds.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-dashed border-slate-200">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Selected Add-ons:</div>
                  {selectedAddOnIds.map((id) => {
                    const match = ADD_ONS.find(ao => ao.id === id);
                    return match ? (
                      <div key={id} className="flex justify-between items-center text-slate-550 pl-2">
                        <span className="italic flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-500" />
                          {match.name}
                        </span>
                        <span>${match.price}</span>
                      </div>
                    ) : null;
                  })}
                  <div className="flex justify-between text-slate-700 font-bold pt-1.5 border-t border-dotted border-slate-200 pl-2">
                    <span>Add-ons subtotal</span>
                    <span>+${getTotalAddOnsPrice()}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Package 1 */}
            <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-3.5 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary-500 text-white px-2.5 py-0.5 rounded-bl-xl text-[9px] font-black uppercase tracking-wider">
                Full Style
              </div>
              <div>
                <span className="text-[9px] font-black uppercase text-slate-400 block tracking-wide">Option A: Premium Package</span>
                <h5 className="font-extrabold text-sm text-slate-800">Full Service Grooming</h5>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900 font-heading">${fullGroomTotal}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Estimated total</span>
              </div>
              <button
                type="button"
                onClick={() => handleBookWithEstimates('Full Service Grooming')}
                className="w-full py-2.5 bg-primary-500 hover:bg-primary-600 text-white font-bold text-xs rounded-full shadow-md shadow-primary-200 transition-all flex items-center justify-center gap-1.5 group"
              >
                <span>Book Full Grooming</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 duration-200" />
              </button>
            </div>

            {/* Action Package 2 */}
            <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-3.5">
              <div>
                <span className="text-[9px] font-black uppercase text-slate-400 block tracking-wide">Option B: Maintenance</span>
                <h5 className="font-extrabold text-sm text-slate-800">Bath & Brush</h5>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900 font-heading">${bathBrushTotal}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Estimated total</span>
              </div>
              <button
                type="button"
                onClick={() => handleBookWithEstimates('Bath & Brush')}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-full shadow-md transition-all flex items-center justify-center gap-1.5 group"
              >
                <span>Book Bath & Brush</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 duration-200" />
              </button>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-200 text-center">
            <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
              * Final price may vary based on coat conditions (mating, density, temperament). Honest consultation at check-in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
