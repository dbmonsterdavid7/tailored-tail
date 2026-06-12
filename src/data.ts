import { ServiceOption, AddOnOption, Testimonial } from './types';

export const BUSINESS_INFO = {
  name: "The Tailored Tail",
  owner: "Jaime Stanchina",
  address: "44270 Warren Road, Canton, MI 48187",
  phone: "(734) 589-3705",
  phoneDisplay: "734-589-3705",
  email: "tailoredtailpetgrooming@gmail.com",
  facebookUrl: "https://www.facebook.com/profile.php?id=61565117851314",
  workingHours: [
    { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" }
  ],
  stats: {
    experienceYears: 24,
    satisfiedPets: "15,000+",
    rating: "4.9/5.0"
  }
};

export const SERVICES: ServiceOption[] = [
  {
    id: "full-groom",
    name: "Full Service Grooming",
    description: "Our premium tier. Complete styling trim or hand scissor cut styled specifically for your pet's breed or preferred cute look.",
    basePrice: 65,
    duration: "2 - 3 hours",
    includes: [
      "Bathing with premium specialty shampoo & conditioner",
      "Gromer consultation & custom coat evaluation",
      "Blow dry or gentle fluff dry tailored to temperament",
      "Thorough brushing out & de-shedding check",
      "Trim, clip or scissoring to breed standard or custom style",
      "Professional nail trimming & smooth filing",
      "Ear cleaning & hair removal where necessary",
      "Hygiene trim & gland expression (on request)"
    ]
  },
  {
    id: "bath-brush",
    name: "Bath & Brush",
    description: "Perfect for keeping pets shiny, fresh-smelling, and clean in between major haircuts.",
    basePrice: 40,
    duration: "1 - 2 hours",
    includes: [
      "Bathing in temperature-regulated water with therapeutic soap",
      "Deep conditioning treatment for clean skin and smooth coat",
      "Gentle blow dry using specialized quiet pet dry technology",
      "Careful deshedding brush out of mats & debris",
      "Ear cleaning to remove moisture and prevent infections",
      "Gentle claw nail clipping",
      "Paw pad trim to keep pads healthy and clean (on request)",
      "Gland expression to relieve discomfort (on request)"
    ]
  }
];

export const ADD_ONS: AddOnOption[] = [
  {
    id: "teeth-brushing",
    name: "Teeth Brushing & Refresh",
    description: "Organic pet-safe enzymatic toothpaste to tackle stubborn plaque and leave breath sparkling minty-fresh.",
    price: 12
  },
  {
    id: "flea-bath",
    name: "Flea & Tick Soothing Bath",
    description: "Soothing natural tick and flea rinse to eliminate bugs and relieve itchiness immediately.",
    price: 18
  },
  {
    id: "moisturizing-mask",
    name: "Warm Moisturizing Mud Treat",
    description: "Mineral-rich warm oatmeal mask to hydrate dry flaking skin and restore natural coat gloss.",
    price: 15
  },
  {
    id: "nail-grinding",
    name: "Nail Dremel Grinding Upgrade",
    description: "Uses a smooth rotation file tool to eliminate sharp edges entirely. Perfect for delicate floor protection and painless scratches.",
    price: 10
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    author: "Sarah M.",
    petName: "Barkley",
    petBreed: "Goldendoodle",
    text: "Jaime is absolute magic! Barkley has high anxiety about nail-trims but he happily ran straight to her. He came back looking incredibly clean, beautifully styled, and smelling like peaches! Highly recommend.",
    rating: 5
  },
  {
    id: "2",
    author: "Dave K.",
    petName: "Luna & Bella",
    petBreed: "Persian Cats",
    text: "Finding a professional cat groomer with real cat-friendly equipment is so rare. Jaime handled my two Persian cats with amazing patience. Their coats have never been this silky and mat-free!",
    rating: 5
  },
  {
    id: "3",
    author: "Jessica T.",
    petName: "Rocky",
    petBreed: "Border Collie",
    text: "Rocky gets incredibly dirty playing in the mud. The Full Grooming service with the Moisturizing Add-on literally transformed him. Truly professional care and worth every single penny.",
    rating: 5
  }
];

export const FAQS = [
  {
    question: "Do I need to make an appointment in advance?",
    answer: "Yes, we strongly encourage booking ahead of time. However, you can submit booking inquiries via our /book-now page or call us directly at (734) 589-3705 to check for last-minute same-day openings."
  },
  {
    question: "How long does a typical grooming session take?",
    answer: "A Bath & Brush package usually takes between 1 to 2 hours, whereas a Full Service Grooming package takes between 2 to 3 hours depending on your pet's size, coat condition, and cooperativeness."
  },
  {
    question: "What qualifications do your groomers hold?",
    answer: "Our owner Jaime Stanchina has over 24 years of Canton area groomer experience. She is certified in pet CPR & Safety and works directly with the local Alsager Animal Care Center to maintain the highest pet medical safety precautions."
  },
  {
    question: "Are cats welcome for grooming too?",
    answer: "Absolutely! We specialize in both dog and cat grooming of all sizes and breeds. Cats receive custom gentle handling in a quiet environment to make sure they remain comfortable."
  },
  {
    question: "How are prices calculated?",
    answer: "Prices vary based on pet size, coat type, matting severity, and overall temperament. We provide a transparent price estimate and custom consultation upon arrival before we begin."
  }
];
