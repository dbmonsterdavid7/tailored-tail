import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Sparkles, Award, Star, Compass, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data';

export default function About() {
  return (
    <div className="paw-bg-pattern min-h-screen py-12 px-4 sm:px-6 lg:px-8" id="about-page">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Page Top Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs uppercase font-black tracking-widest text-primary-600 bg-primary-100/60 border border-white/45 px-4 py-1.5 rounded-full inline-block">
            Our Founder's Story
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 font-heading">
            Wags & Care from a True Professional
          </h1>
          <p className="text-slate-600 text-lg">
            Meet Jaime Stanchina, the passionate heart and owner behind Canton's favorite family grooming lounge.
          </p>
        </div>

        {/* Dynamic Multi-Part Content Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual card representing Jaime & Team */}
          <div className="lg:col-span-5 relative text-slate-900">
            <div className="glass-card p-6 rounded-[2rem] shadow-xl transform -rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="aspect-[4/5] rounded-2xl relative overflow-hidden border border-white/40 shadow-inner group">
                {/* Visual background image of our brand/founder */}
                <img
                  src="/about-us.webp"
                  alt="Jaime Stanchina"
                  className="absolute inset-0 w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Dark gradient overlay to guarantee superb white text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-transparent z-10" />

                {/* Narrative content on visual background */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-end p-6 text-center text-white">
                  <h3 className="text-2xl font-black font-heading tracking-tight mb-1">Jaime Stanchina</h3>
                  <p className="text-primary-300 text-xs font-semibold uppercase tracking-wider mb-3">Owner & Safety-Certified Groomer</p>
                  
                  <p className="text-slate-150 text-xs leading-relaxed max-w-[240px]">
                    Canton's premier professional styling expert. Safety, artistry, and love in every single groom.
                  </p>

                  <div className="mt-4 bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-white font-bold text-xs tracking-wide shadow-sm w-full flex items-center justify-center gap-2">
                    <span>✨ Owner Groomer - Jaime</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Absolute positioning badges */}
            <div className="absolute -top-6 -right-6 bg-yellow-400 text-gray-950 font-black py-3.5 px-5 rounded-2xl shadow-lg text-sm border-2 border-white flex items-center gap-2">
              <Award className="w-5 h-5 text-gray-950 fill-current" />
              <span>24.5+ Years Exp</span>
            </div>
            <div className="absolute -bottom-6 -left-6 glass-item py-3.5 px-5 rounded-2xl shadow-lg flex items-center gap-2 text-xs font-bold text-slate-700">
              <span>🩺</span>
              <span>Alsager Clinic Partner</span>
            </div>
          </div>

          {/* Narrative description of Jaime's biography & love for animals */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl font-black text-slate-900 font-heading">
              Grooming is more than a job — it’s a lifetime passion.
            </h2>
            
            <p className="text-slate-650 leading-relaxed text-sm md:text-base">
              Jaime has been deeply passionate about animals since childhood, a pure love she inherited from her father. At just 14 years old, she began working in a local pet grooming shop on Saturdays, learning the fundamentals of brushwork and coat care. By 16, her curiosity led her to join the premier box store grooming salon in the Westland area.
            </p>

            <p className="text-slate-650 leading-relaxed text-sm md:text-base">
              For the past <strong>24.5 years</strong>, Jaime has been a dedicated groomer in the <strong>Canton, MI area</strong>. Unlike massive retail assembly-line operations, she treats grooming as an art form. She takes immense pride in her styling and understands that her customers appreciate and expect proper returns on their budget.
            </p>

            {/* Quote indicator block */}
            <div className="border-l-4 border-primary-500 pl-4 py-3 italic text-slate-750 bg-white/40 border border-white/60 rounded-r-2xl shadow-sm">
              "Furry tails wag with joy and every pooch prances in with a pep! We're the go-to spot where grooming turns into a playful adventure, ensuring dogs feel fabulous, happy, and cute!"
              <span className="block font-bold text-xs text-primary-600 mt-2 not-italic">— Jaime Stanchina, Owner</span>
            </div>
          </div>
        </div>

        {/* Safety standards metrics grid cards */}
        <section className="glass-card p-8 md:p-12 rounded-[2rem] shadow-md">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-2xl font-black text-slate-900 font-heading">Our Three Trust Core Commitments</h3>
            <p className="text-slate-500 text-sm">We structure every single drop-off with stringent safety precautions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 glass-item text-primary-500 rounded-full flex items-center justify-center font-bold">✓</div>
              <h4 className="text-lg font-bold text-slate-800 font-heading">Pet CPR Certified</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                We are fully certified to handle delicate respiratory or medical emergencies, monitoring vitals and heart rhythms for ultimate client safety.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 glass-item text-blue-500 rounded-full flex items-center justify-center font-bold">🩺</div>
              <h4 className="text-lg font-bold text-slate-800 font-heading">Vet Relationship Alignment</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                We maintain active immediate proximity relationships with Alsager Animal Care Center. Rest easy knowing absolute veterinary backup is milliseconds away.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 glass-item text-amber-500 rounded-full flex items-center justify-center font-bold">💎</div>
              <h4 className="text-lg font-bold text-slate-800 font-heading">Customized Dropconsults</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Pricing varies depending on actual coat conditions, size, and temperament. Jaime offers transparent dropconsults, so you understand price metrics upfront.
              </p>
            </div>
          </div>
        </section>

        {/* Call to action section */}
        <div className="glass-card p-8 md:p-12 rounded-[2rem] flex flex-col md:flex-row justify-between items-center gap-8 shadow-sm">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-black text-slate-900 font-heading">Ready to see Jaime in action?</h3>
            <p className="text-slate-600 text-sm md:text-base">
              Secure an estimate and lock your pet's premium grooming spot online!
            </p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link
              to="/book-now"
              className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-full shadow-lg shadow-primary-200 duration-300"
            >
              Get Custom Bookings
            </Link>
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="px-6 py-3 border-2 border-primary-200 text-primary-600 hover:bg-white/40 backdrop-blur-sm font-bold rounded-full duration-300"
            >
              Call Us: {BUSINESS_INFO.phoneDisplay}
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
