export interface User {
  id: string;
  email: string;
  name: string;
  role: 'traveler' | 'host';
  avatar?: string;
  bio?: string;
  phone?: string;
  created_at: string;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  short_description: string;
  city: string;
  category: string;
  price: number;
  duration: number;
  max_group_size: number;
  images: string[];
  host_id: string;
  host?: User;
  rating: number;
  reviews_count: number;
  created_at: string;
}

export interface Booking {
  id: string;
  experience_id: string;
  traveler_id: string;
  host_id: string;
  date: string;
  group_size: number;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
  experience?: Experience;
}

export interface SearchFilters {
  city: string;
  category: string;
  priceRange: [number, number];
  date: string;
}

export interface Stay {
  id: string;
  title: string;
  description: string;
  short_description: string;
  city: string;
  state: string;
  coordinates: [number, number]; // [latitude, longitude]
  property_type: 'farmhouse' | 'cottage' | 'villa' | 'traditional_home' | 'treehouse';
  price_per_night: number;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  amenities: string[];
  house_rules: string[];
  host_id: string;
  host?: User;
  rating: number;
  reviews_count: number;
  available_from: string;
  available_to: string;
  created_at: string;
}

export interface StayBooking {
  id: string;
  stay_id: string;
  traveler_id: string;
  host_id: string;
  check_in: string;
  check_out: string;
  guests: number;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
  stay?: Stay;
}