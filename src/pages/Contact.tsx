import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, ChevronDown, Compass, Send } from 'lucide-react';
import { BUSINESS_INFO, FAQS } from '../data';

export default function Contact() {
  // Contact Message form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    petInfo: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // FAQ Expand toggle states index map
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitError('Please fill in your Name, Email and Message!');
      return;
    }
    
    // Simulate real database receipt
    setIsSubmitted(true);
    setSubmitError('');
    // Store in localStorage for simulated API review
    const currentLeads = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    currentLeads.push({
      ...formData,
      id: Math.random().toString(),
      createdAt: new Date().toISOString()
    });
    localStorage.setItem('contactMessages', JSON.stringify(currentLeads));
  };

  const toggleFaq = (index: number) => {
    if (expandedFaq === index) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(index);
    }
  };

  return (
    <div className="paw-bg-pattern min-h-screen py-12 px-4 sm:px-6 lg:px-8" id="contact-page">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Top Header Card */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs uppercase font-black tracking-widest text-primary-600 bg-primary-100/60 border border-white/40 px-4 py-1.5 rounded-full inline-block">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 font-heading">
            Contact Us & Ask Questions
          </h1>
          <p className="text-slate-600 text-lg">
            Have a question or custom temperament requirement? Drop us a prompt or call Jaime directly!
          </p>
        </div>

        {/* 1. MAIN CONTACT GRID */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct info detail cards & operational hours */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-card p-8 rounded-[2rem] space-y-6 shadow-xl">
              <h3 className="text-2xl font-black text-slate-900 font-heading">Reach Jaime</h3>
              
              <ul className="space-y-5">
                {/* Phone */}
                <li className="flex items-start gap-4">
                  <div className="p-3.5 bg-primary-500 text-white rounded-2xl">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-400 text-xs uppercase tracking-wider">Direct Salon Phone</h5>
                    <a href={`tel:${BUSINESS_INFO.phone}`} className="text-lg font-black text-primary-600 font-heading hover:underline">
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                    <span className="block text-[10px] text-slate-400">Call/text to quickcheck openings</span>
                  </div>
                </li>

                {/* Email */}
                <li className="flex items-start gap-4">
                  <div className="p-3.5 bg-blue-100 text-blue-500 rounded-2xl border border-white/50">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-400 text-xs uppercase tracking-wider">Email Inquiry</h5>
                    <a href={`mailto:${BUSINESS_INFO.email}`} className="text-sm font-bold text-slate-700 hover:text-primary-500 duration-200 break-all">
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                </li>

                {/* Map location */}
                <li className="flex items-start gap-4">
                  <div className="p-3.5 bg-secondary-100 text-secondary-500 rounded-2xl border border-white/50">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-400 text-xs uppercase tracking-wider">Grooming Location</h5>
                    <span className="text-sm font-semibold text-slate-700 block">
                      {BUSINESS_INFO.address}
                    </span>
                    <span className="block text-[10px] text-slate-400">Canton, MI area close to Warren Rd</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Operating Hours card */}
            <div className="glass-card p-8 rounded-[2rem] space-y-4 shadow-md">
              <h4 className="text-xl font-black text-slate-900 font-heading">Working Hours</h4>
              <ul className="space-y-2.5 text-sm">
                {BUSINESS_INFO.workingHours.map((row, i) => (
                  <li key={i} className="flex justify-between items-center text-slate-600 border-b border-slate-200/30 pb-1.5 font-medium">
                    <span className="font-bold text-slate-800">{row.day}</span>
                    <span>{row.hours}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 glass-card p-8 md:p-10 rounded-[2rem] shadow-xl">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto scale-110 border border-white/30">
                  <CheckCircle2 className="w-10 h-10 fill-current" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-slate-900 font-heading">Message Sent!</h3>
                  <p className="text-slate-600 text-sm max-w-sm mx-auto">
                    Thank you so much, <strong>{formData.name}</strong>! Jaime has received your question. We'll be in touch soon at <strong>{formData.email}</strong>.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', petInfo: '', message: '' });
                  }}
                  className="px-6 py-2.5 bg-white/60 hover:bg-white text-slate-800 font-bold text-sm rounded-full duration-300 border border-slate-205"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-900 font-heading">Send a Custom Message</h3>
                  <p className="text-xs text-slate-400 font-semibold">Fill in details and we'll reply directly through email or phone calls.</p>
                </div>

                {submitError && (
                  <div className="p-3.5 bg-rose-50 border border-rose-150 text-rose-600 font-bold text-xs rounded-xl flex items-center gap-2">
                    <span>⚠️</span>
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Your Name *</label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-2xl border border-white/60 bg-white/40 text-sm focus:outline-none focus:border-primary-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Your Email *</label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-2xl border border-white/60 bg-white/40 text-sm focus:outline-none focus:border-primary-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-705 uppercase tracking-wide">Phone Number (optional)</label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="734-555-0199"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-2xl border border-white/60 bg-white/40 text-sm focus:outline-none focus:border-primary-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-705 uppercase tracking-wide">Your Pet Class & Breed</label>
                    <input
                      name="petInfo"
                      type="text"
                      placeholder="Golden Retriever or Persian cat"
                      value={formData.petInfo}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-2xl border border-white/60 bg-white/40 text-sm focus:outline-none focus:border-primary-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-705 uppercase tracking-wide">Your Message or Question *</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Describe your pet's styling preference, special health concerns or booking slot inquiries here..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-2xl border border-white/60 bg-white/40 text-sm focus:outline-none focus:border-primary-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white font-black rounded-full shadow-lg shadow-primary-200 duration-300 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5 text-white" />
                  <span>Send Message Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </section>

        {/* 2. FAQS SYSTEM SECTION */}
        <section className="space-y-8" id="faq-section">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-3xl font-black text-slate-900 font-heading">Frequently Asked Questions</h3>
            <p className="text-slate-550 text-sm">Clear, immediate answers to popular questions local pet parents ask us.</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {FAQS.map((faq, index) => {
              const isExpanded = expandedFaq === index;
              return (
                <div key={index} className="glass-card rounded-2xl border-white/40 shadow-sm overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-5 font-bold text-base md:text-lg text-slate-800 flex justify-between items-center hover:bg-white/40 duration-200 focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-primary-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 text-sm md:text-base text-slate-600 leading-relaxed border-t border-slate-205/30 bg-white/20">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
