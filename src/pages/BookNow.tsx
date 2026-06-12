import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sparkles, CheckCircle2, ChevronRight, ChevronLeft, Phone, Calendar, Heart } from 'lucide-react';
import { SERVICES, ADD_ONS, BUSINESS_INFO } from '../data';
import { LeadBooking } from '../types';

export default function BookNow() {
  const location = useLocation();

  // Multi-step Stepper control state
  const [step, setStep] = useState(1);

  // Form Fields
  const [ownerName, setOwnerName] = useState('');
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState<'dog' | 'cat' | 'other'>('dog');
  const [petBreed, setPetBreed] = useState('');
  const [petSize, setPetSize] = useState<'small' | 'medium' | 'large' | 'giant'>('small');
  const [serviceType, setServiceType] = useState('Full Service Grooming');
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('08:00 AM');
  const [message, setMessage] = useState('');

  // Complete Booking states
  const [isCompleted, setIsCompleted] = useState(false);
  const [bookingSummary, setBookingSummary] = useState<LeadBooking | null>(null);

  // Load redirected estimator states if present
  useEffect(() => {
    if (location.state) {
      const state = location.state as any;
      if (state.petType) setPetType(state.petType);
      if (state.petSize) setPetSize(state.petSize);
      if (state.serviceType) setServiceType(state.serviceType);
      if (state.addOnIds) setSelectedAddOnIds(state.addOnIds);
      
      // Auto move helper to step 2 if we came from estimates
      setStep(1);
    }
  }, [location.state]);

  const handleAddOnToggle = (id: string) => {
    if (selectedAddOnIds.includes(id)) {
      setSelectedAddOnIds(selectedAddOnIds.filter(item => item !== id));
    } else {
      setSelectedAddOnIds([...selectedAddOnIds, id]);
    }
  };

  const getPackagePrice = (): number => {
    let price = serviceType.includes('Grooming') ? 65 : 40;
    if (petType === 'cat') price += 15;

    switch (petSize) {
      case 'medium': price += 15; break;
      case 'large': price += 35; break;
      case 'giant': price += 60; break;
    }
    return price;
  };

  const getAddOnsPrice = (): number => {
    return selectedAddOnIds.reduce((total, id) => {
      const match = ADD_ONS.find(ao => ao.id === id);
      return total + (match ? match.price : 0);
    }, 0);
  };

  const handleNextStep = () => {
    if (step === 1 && (!petName || !petBreed)) {
      alert("Please fill in your Pet's Name and Breed first! 🐾");
      return;
    }
    if (step === 3 && !preferredDate) {
      alert("Please select your preferred Date first! 📅");
      return;
    }
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownerName || !email || !phone) {
      alert("Please enter your Name, Email, and Phone number to continue!");
      return;
    }

    const newBooking: LeadBooking = {
      id: "TT-" + Math.floor(1000 + Math.random() * 9000),
      ownerName,
      petName,
      petType,
      petBreed,
      petSize,
      serviceType,
      addOnIds: selectedAddOnIds,
      email,
      phone,
      preferredDate,
      preferredTimeSlot,
      message,
      createdAt: new Date().toISOString()
    };

    // Save strictly to local state & LocalStorage
    const currentBookings = JSON.parse(localStorage.getItem('bookingRequests') || '[]');
    currentBookings.push(newBooking);
    localStorage.setItem('bookingRequests', JSON.stringify(currentBookings));

    setBookingSummary(newBooking);
    setIsCompleted(true);
  };

  return (
    <div className="paw-bg-pattern min-h-screen py-10 px-4 sm:px-6 lg:px-8" id="book-now-page">
      <div className="max-w-4xl mx-auto">
        
        {isCompleted && bookingSummary ? (
          /* COMPLETION SUCCESS SCREEN */
          <div className="glass-card p-8 md:p-12 rounded-[2rem] shadow-2xl relative space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto scale-110 border border-white/35">
                <CheckCircle2 className="w-12 h-12 fill-current" />
              </div>
              <span className="text-xs font-black uppercase text-emerald-600 bg-emerald-100/50 px-3 py-1 rounded-full inline-block">
                Request Summary Created Successfully
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 font-heading">
                Grooming Inquiry Submitted!
              </h1>
              <p className="text-slate-550 text-sm max-w-lg mx-auto">
                Thank you so much! Jaime has received your appointment request. Your booking code is <strong className="text-primary-500 font-mono">{bookingSummary.id}</strong>. We will review and text/call you shortly to finalize your specific check-in drop slots.
              </p>
            </div>

            {/* Comprehensive Booking specifications panel */}
            <div className="glass-item p-6 rounded-2xl text-sm space-y-4 max-w-xl mx-auto">
              <h4 className="font-extrabold text-slate-800 uppercase tracking-widest text-xs border-b border-white/35 pb-2">
                Booking Reference Sheet
              </h4>
              
              <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Owner Name</span>
                  <span className="text-slate-800 font-bold">{bookingSummary.ownerName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Pet Name</span>
                  <span className="text-slate-800 font-bold">{bookingSummary.petName} ({bookingSummary.petBreed})</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Preferred Time & Date</span>
                  <span className="text-primary-600 font-extrabold">{bookingSummary.preferredDate} @ {bookingSummary.preferredTimeSlot}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Package Slotted</span>
                  <span className="text-slate-800 font-bold">{bookingSummary.serviceType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Contact Email</span>
                  <span className="text-slate-700 font-medium">{bookingSummary.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Contact Phone</span>
                  <span className="text-slate-750 font-medium">{bookingSummary.phone}</span>
                </div>
              </div>

              {selectedAddOnIds.length > 0 && (
                <div className="pt-2 border-t border-dashed border-slate-205/30">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">Add Ons Requested</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedAddOnIds.map(id => {
                      const match = ADD_ONS.find(ao => ao.id === id);
                      return match ? (
                        <span key={id} className="bg-primary-100/60 border border-white/45 text-[11px] font-bold text-primary-600 px-2.5 py-1 rounded-full">
                          + {match.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-slate-205/30 text-center">
                <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block mb-1">Estimated Grooming Tab</span>
                <span className="text-3xl font-black text-slate-900 font-heading">
                  ${getPackagePrice() + getAddOnsPrice()}
                </span>
                <span className="text-[9px] text-slate-400 block mt-1">Based on coat consultancy dropped-off</span>
              </div>
            </div>

            {/* Quick next steps list */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-emerald-250 bg-emerald-50/50 rounded-xl max-w-md mx-auto text-xs text-slate-700">
                <span>🏥</span>
                <span>Safety First: Jaime is CPR certified and aligns directly with Alsager Clinic.</span>
              </div>
              <div className="flex justify-center gap-4 pt-4">
                <button
                  onClick={() => setIsCompleted(false)}
                  className="px-6 py-3 bg-primary-500 text-white font-bold rounded-full shadow-lg hover:bg-primary-600 duration-300"
                >
                  Submit Another Pet Booking
                </button>
                <a
                  href={`tel:${BUSINESS_INFO.phone}`}
                  className="px-6 py-3 border-2 border-white bg-white/40 hover:bg-white text-slate-700 font-bold rounded-full text-sm duration-300"
                >
                  Call Jaime: {BUSINESS_INFO.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* MULTI STEP STEPPER FUNNEL CARD */
          <div className="glass-card p-6 md:p-10 rounded-[2rem] shadow-xl space-y-8">
            
            {/* Horizontal progress indicators */}
            <div className="flex justify-between items-center max-w-md mx-auto relative">
              <div className="absolute left-0 right-0 top-1/2 h-1 bg-white/30 z-0 -translate-y-1/2" />
              <div className="absolute left-0 top-1/2 h-1 bg-primary-500 z-0 -translate-y-1/2 transition-all duration-300" style={{ width: `${((step - 1) / 3) * 100}%` }} />
              
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm z-10 duration-300 ${
                    step >= num
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'bg-white/40 text-slate-550 border border-white/60'
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>

            <div className="text-center space-y-1">
              <h2 className="text-2xl font-black text-slate-900 font-heading">
                {step === 1 && "Step 1: Your Pet's Details"}
                {step === 2 && "Step 2: Choose Grooming Option"}
                {step === 3 && "Step 3: Appointment Date & Time"}
                {step === 4 && "Step 4: Contact & Finish Request"}
              </h2>
              <p className="text-slate-500 text-xs md:text-sm font-semibold">
                {step === 1 && "Tell us about your furry friend so we prepare specialized combs and shampoo."}
                {step === 2 && "Configure styling cuts or quick bath needs and get custom prices instantly."}
                {step === 3 && "Select your pet parent preferred calendar day slots."}
                {step === 4 && "Provide your email and telephone connection details."}
              </p>
            </div>

            <div className="py-2">
              
              {/* STEP 1: PET DETAILS */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-705 uppercase">Pet's Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Buddy or Luna"
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-white/60 bg-white/40 text-sm focus:outline-none focus:border-primary-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-705 uppercase">Pet's Breed *</label>
                      <input
                        type="text"
                        required
                        placeholder="Goldendoodle / Persian Cat"
                        value={petBreed}
                        onChange={(e) => setPetBreed(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-white/60 bg-white/40 text-sm focus:outline-none focus:border-primary-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-705 uppercase">Pet Type</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'dog', label: '🐶 Dog' },
                        { id: 'cat', label: '🐱 Cat' },
                        { id: 'other', label: '🐾 Other' }
                      ].map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setPetType(t.id as any)}
                          className={`p-3.5 rounded-2xl font-bold text-xs border duration-205 ${
                            petType === t.id
                              ? 'bg-primary-500 text-white border-primary-500 shadow-md'
                              : 'bg-white/40 text-slate-600 border-white/70 hover:bg-white/65'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-705 uppercase">Weight Class Size</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { id: 'small', label: 'Small', desc: 'Under 15 lbs' },
                        { id: 'medium', label: 'Medium', desc: '15 - 40 lbs' },
                        { id: 'large', label: 'Large', desc: '40 - 75 lbs' },
                        { id: 'giant', label: 'Giant', desc: '75+ lbs' }
                      ].map((sz) => (
                        <button
                          key={sz.id}
                          type="button"
                          onClick={() => setPetSize(sz.id as any)}
                          className={`p-3.5 rounded-2xl font-bold border text-left duration-200 flex flex-col justify-center items-center text-xs ${
                            petSize === sz.id
                              ? 'bg-emerald-500 text-white border-emerald-500 shadow-sm'
                              : 'bg-white/40 text-slate-600 border-white/70 hover:bg-white/65'
                          }`}
                        >
                          <span className="font-extrabold text-sm">{sz.label}</span>
                          <span className="text-[10px] block opacity-80 mt-0.5">{sz.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: SERVICE SELECTION */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-705 uppercase">Select Core Grooming Package</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { name: 'Full Service Grooming', desc: 'Detailed breed scissor trim cut, bathing, nails, ears, blowdry.' },
                        { name: 'Bath & Brush', desc: 'Bathing, deep conditioner, deshedding brush out, nails, pad tidy.' }
                      ].map((serv) => (
                        <div
                          key={serv.name}
                          onClick={() => setServiceType(serv.name)}
                          className={`p-5 rounded-2xl border cursor-pointer select-none transition-all ${
                            serviceType === serv.name
                              ? 'bg-primary-100/40 border-primary-450 shadow-md ring-2 ring-primary-105'
                              : 'bg-white/50 border-white/70 hover:bg-white/75'
                          }`}
                        >
                          <span className="font-extrabold text-base text-slate-900 block">{serv.name}</span>
                          <span className="text-xs text-slate-550 mt-2 block leading-relaxed">{serv.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-705 uppercase">Upgrade Add Ons (Optional)</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {ADD_ONS.map((ao) => {
                        const isChecked = selectedAddOnIds.includes(ao.id);
                        return (
                          <div
                            key={ao.id}
                            onClick={() => handleAddOnToggle(ao.id)}
                            className={`p-4 rounded-xl border cursor-pointer select-none transition-all flex items-start gap-3 ${
                              isChecked
                                ? 'bg-primary-100/40 border-primary-300'
                                : 'bg-white/40 border-white/60 hover:bg-white/65'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}} // div handler takes care
                              className="mt-0.5 accent-primary-500 rounded"
                            />
                            <div>
                              <div className="flex justify-between items-center gap-2">
                                <span className="font-bold text-xs text-slate-800">{ao.name}</span>
                                <span className="font-black text-xs text-primary-500 shrink-0">+${ao.price}</span>
                              </div>
                              <p className="text-[10px] text-slate-500 mt-1 leading-tight">{ao.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Immediate running totals estimates panel */}
                  <div className="glass-item p-4 rounded-2xl flex items-center justify-between text-sm shadow-inner">
                    <div>
                      <span className="text-slate-450 text-[10px] uppercase font-bold">Estimated running price subtotal:</span>
                      <p className="text-xs text-slate-500">Based on {petType === 'cat' ? 'Cat' : 'Dog'} - {petSize}</p>
                    </div>
                    <span className="text-2xl font-black text-primary-600 font-heading">
                      ${getPackagePrice() + getAddOnsPrice()}
                    </span>
                  </div>
                </div>
              )}

              {/* STEP 3: DATE & TIME */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-705 uppercase tracking-wide">
                        Choose Your Preferred Calendar Day *
                      </label>
                      <input
                        type="date"
                        required
                        value={preferredDate}
                        min={new Date().toISOString().split('T')[0]} // Block previous days
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-white/60 bg-white/40 text-sm focus:outline-none focus:border-primary-400"
                      />
                      <span className="text-[10px] text-slate-400 block pt-1 leading-normal font-semibold">
                        * Closed on Sundays. Jaime schedules early drop-off consultations.
                      </span>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-705 uppercase tracking-wide">
                        Preferred Arrival Hour Window
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { time: '08:00 AM', label: 'Early (8:00 AM)' },
                          { time: '10:00 AM', label: 'Mid-Morning' },
                          { time: '01:00 PM', label: 'Lunch (1:00 PM)' },
                          { time: '03:00 PM', label: 'Afternoon' }
                        ].map((t) => (
                          <button
                            key={t.time}
                            type="button"
                            onClick={() => setPreferredTimeSlot(t.time)}
                            className={`p-3 rounded-2xl font-bold text-xs border duration-200 ${
                              preferredTimeSlot === t.time
                                ? 'bg-primary-500 text-white border-primary-500 shadow-md'
                                : 'bg-white/40 text-slate-600 border-white/70 hover:bg-white/65'
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: CONTACT PREFERENCE */}
              {step === 4 && (
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-705 uppercase">Your Name (Parent) *</label>
                      <input
                        type="text"
                        required
                        placeholder="Jane Doe"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-white/60 bg-white/40 text-sm focus:outline-none focus:border-primary-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-705 uppercase">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="jane@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-white/60 bg-white/40 text-sm focus:outline-none focus:border-primary-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-750 uppercase">Phone Number (Cell) *</label>
                      <input
                        type="tel"
                        required
                        placeholder="734-555-0100"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-white/60 bg-white/40 text-sm focus:outline-none focus:border-primary-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-750 uppercase">Temperament / Special concerns</label>
                      <input
                        type="text"
                        placeholder="Nervous about dremels, CPR history, none"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-white/60 bg-white/40 text-sm focus:outline-none focus:border-primary-400"
                      />
                    </div>
                  </div>

                  {/* Summary of estimates */}
                  <div className="p-5 rounded-2xl glass-item border-white/20 space-y-2 text-xs">
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Grooming estimate on drop-off</span>
                      <span className="font-extrabold text-sm text-slate-800">${getPackagePrice() + getAddOnsPrice()}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Preferred Slot</span>
                      <span className="font-bold text-primary-500">{preferredDate} @ {preferredTimeSlot}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Owner / Pet Details</span>
                      <span className="font-bold">{petName} the {petBreed}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white font-black rounded-full text-base shadow-lg shadow-primary-200 duration-300 transform hover:-translate-y-0.5"
                  >
                    Confirm Booking Request Submittal
                  </button>
                </form>
              )}

            </div>

            {/* Stepper Wizard navigation buttons bar */}
            {step < 4 && (
              <div className="pt-6 border-t border-white/20 flex justify-between gap-4">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-3 bg-white/40 hover:bg-white text-slate-700 font-bold text-sm rounded-full border border-white/65 duration-205 flex items-center gap-1.5"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div /> // Placeholder to float right button correctly
                )}

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-white font-black text-sm rounded-full shadow-lg shadow-primary-200 duration-200 flex items-center gap-1.5 ml-auto"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
