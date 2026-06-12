export interface ServiceOption {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  duration: string;
  includes: string[];
}

export interface AddOnOption {
  id: string;
  name: string;
  description: string;
  price: number;
}

export interface LeadBooking {
  id: string;
  ownerName: string;
  petName: string;
  petType: 'dog' | 'cat' | 'other';
  petBreed: string;
  petSize: 'small' | 'medium' | 'large' | 'giant';
  serviceType: string;
  addOnIds: string[];
  email: string;
  phone: string;
  preferredDate: string;
  preferredTimeSlot: string;
  message?: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  author: string;
  petName: string;
  petBreed: string;
  text: string;
  rating: number;
  avatarUrl?: string;
}
