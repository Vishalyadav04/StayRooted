import { Experience, User, Booking } from '../types';

export const mockHosts: User[] = [
  {
    id: '1',
    email: 'priya@example.com',
    name: 'Priya Sharma',
    role: 'host',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150',
    bio: 'Born and raised in Delhi, I love sharing the hidden gems of Old Delhi and authentic Mughlai cuisine.',
    phone: '+91 98765 43210',
    created_at: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    email: 'raj@example.com',
    name: 'Raj Patel',
    role: 'host',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=150',
    bio: 'Mumbai street food expert with 15 years of experience guiding food tours through local markets.',
    phone: '+91 87654 32109',
    created_at: '2024-01-10T00:00:00Z'
  },
  {
    id: '3',
    email: 'maya@example.com',
    name: 'Maya Nair',
    role: 'host',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150',
    bio: 'Kerala backwaters native offering authentic houseboat experiences and traditional cooking classes.',
    phone: '+91 76543 21098',
    created_at: '2024-01-20T00:00:00Z'
  }
];

export const mockExperiences: Experience[] = [
  {
    id: '1',
    title: 'Old Delhi Heritage Food Walk',
    description: 'Explore the bustling streets of Old Delhi while savoring authentic Mughlai cuisine, street food, and traditional sweets. Visit century-old shops, interact with local vendors, and discover the culinary secrets passed down through generations.',
    short_description: 'Authentic Old Delhi street food tour with local guide',
    city: 'Delhi',
    coordinates: [28.6562, 77.2410], // Old Delhi coordinates
    category: 'Food Tours',
    price: 1500,
    duration: 4,
    max_group_size: 8,
    images: [
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg'
    ],
    host_id: '1',
    host: mockHosts[0],
    rating: 4.8,
    reviews_count: 127,
    created_at: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    title: 'Mumbai Street Food Adventure',
    description: 'Experience Mumbai\'s incredible street food scene from Chowpatty Beach to Mohammed Ali Road. Taste iconic vada pav, bhel puri, dosa, and end with kulfi at a century-old shop.',
    short_description: 'Mumbai street food tour covering iconic local flavors',
    city: 'Mumbai',
    coordinates: [19.0760, 72.8777], // Mumbai coordinates
    category: 'Food Tours',
    price: 1200,
    duration: 3,
    max_group_size: 6,
    images: [
      'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
      'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg'
    ],
    host_id: '2',
    host: mockHosts[1],
    rating: 4.9,
    reviews_count: 203,
    created_at: '2024-01-16T00:00:00Z'
  },
  {
    id: '3',
    title: 'Kerala Backwaters Cultural Experience',
    description: 'Sail through serene backwaters on a traditional houseboat, learn about coconut farming, witness toddy tapping, and enjoy a homemade Kerala feast prepared with local spices.',
    short_description: 'Traditional houseboat experience with local cuisine',
    city: 'Kerala',
    coordinates: [9.9312, 76.2673], // Kerala backwaters coordinates
    category: 'Cultural Experiences',
    price: 3500,
    duration: 8,
    max_group_size: 4,
    images: [
      'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg',
      'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg'
    ],
    host_id: '3',
    host: mockHosts[2],
    rating: 4.7,
    reviews_count: 89,
    created_at: '2024-01-17T00:00:00Z'
  },
  {
    id: '4',
    title: 'Taj Mahal Sunrise Photography Tour',
    description: 'Capture the magic of Taj Mahal at sunrise with a local photographer. Learn about Mughal architecture, hear romantic stories, and discover the best photography spots.',
    short_description: 'Professional photography tour of Taj Mahal at sunrise',
    city: 'Agra',
    coordinates: [27.1751, 78.0421], // Agra coordinates
    category: 'Historical Sites',
    price: 2000,
    duration: 5,
    max_group_size: 10,
    images: [
      'https://images.pexels.com/photos/1583339/pexels-photo-1583339.jpeg',
      'https://images.pexels.com/photos/1150/pexels-photo-1150.jpeg'
    ],
    host_id: '1',
    host: mockHosts[0],
    rating: 4.9,
    reviews_count: 156,
    created_at: '2024-01-18T00:00:00Z'
  },
  {
    id: '5',
    title: 'Jaipur Royal Palace Adventure',
    description: 'Explore Jaipur\'s magnificent palaces and forts with a local historian. Ride an elephant at Amber Fort, shop in colorful bazaars, and enjoy a traditional Rajasthani lunch.',
    short_description: 'Royal palaces and forts tour with elephant ride',
    city: 'Jaipur',
    coordinates: [26.9124, 75.7873], // Jaipur coordinates
    category: 'Family Fun',
    price: 2800,
    duration: 6,
    max_group_size: 8,
    images: [
      'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg',
      'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg'
    ],
    host_id: '2',
    host: mockHosts[1],
    rating: 4.6,
    reviews_count: 94,
    created_at: '2024-01-19T00:00:00Z'
  },
  {
    id: '6',
    title: 'Hidden Gems of Mumbai',
    description: 'Discover Mumbai beyond the tourist trail. Visit local art galleries, hidden temples, artisan workshops, and enjoy chai with locals in their neighborhood.',
    short_description: 'Off-beat Mumbai exploration with local insights',
    city: 'Mumbai',
    coordinates: [19.0176, 72.8562], // Mumbai South coordinates
    category: 'Hidden Gems',
    price: 1800,
    duration: 5,
    max_group_size: 6,
    images: [
      'https://images.pexels.com/photos/2341290/pexels-photo-2341290.jpeg',
      'https://images.pexels.com/photos/1109197/pexels-photo-1109197.jpeg'
    ],
    host_id: '2',
    host: mockHosts[1],
    rating: 4.8,
    reviews_count: 71,
    created_at: '2024-01-20T00:00:00Z'
  }
];

export const cities = ['Delhi', 'Mumbai', 'Jaipur', 'Kerala', 'Agra', 'Goa', 'Varanasi', 'Bangalore'];
export const categories = ['Food Tours', 'Cultural Experiences', 'Historical Sites', 'Family Fun', 'Hidden Gems', 'Adventure'];

export const mockStays: Stay[] = [
  {
    id: '1',
    title: 'Rustic Farmhouse in Punjab Countryside',
    description: 'Experience authentic Punjabi village life in our traditional farmhouse surrounded by wheat fields. Wake up to the sound of roosters, enjoy fresh farm-to-table meals, and participate in daily farming activities. Our family has been farming this land for generations and we love sharing our way of life with guests.',
    short_description: 'Traditional Punjabi farmhouse with authentic village experience',
    city: 'Amritsar',
    state: 'Punjab',
    coordinates: [31.6340, 74.8723], // Amritsar coordinates
    property_type: 'farmhouse',
    price_per_night: 2500,
    max_guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    images: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg'
    ],
    amenities: ['Farm-to-table meals', 'Bullock cart rides', 'Traditional cooking classes', 'Bonfire evenings', 'Free WiFi', 'Air conditioning'],
    house_rules: ['No smoking indoors', 'Respect local customs', 'Participate in morning prayers (optional)', 'Help with farm activities'],
    host_id: '1',
    host: mockHosts[0],
    rating: 4.9,
    reviews_count: 67,
    available_from: '2024-01-01',
    available_to: '2024-12-31',
    created_at: '2024-01-10T00:00:00Z'
  },
  {
    id: '2',
    title: 'Cozy Mountain Cottage in Himachal',
    description: 'Escape to our charming wooden cottage nestled in the Himachal hills. Surrounded by apple orchards and pine forests, this is the perfect retreat for nature lovers. Enjoy panoramic mountain views, fresh mountain air, and home-cooked Himachali cuisine prepared by our family.',
    short_description: 'Mountain cottage with apple orchards and stunning valley views',
    city: 'Manali',
    state: 'Himachal Pradesh',
    coordinates: [32.2396, 77.1887], // Manali coordinates
    property_type: 'cottage',
    price_per_night: 3200,
    max_guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    images: [
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',
      'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg',
      'https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg'
    ],
    amenities: ['Mountain views', 'Apple orchard access', 'Fireplace', 'Home-cooked meals', 'Trekking guides', 'Free parking'],
    house_rules: ['No loud music after 9 PM', 'Respect nature', 'No littering', 'Inform host about trekking plans'],
    host_id: '2',
    host: mockHosts[1],
    rating: 4.8,
    reviews_count: 43,
    available_from: '2024-03-01',
    available_to: '2024-11-30',
    created_at: '2024-01-15T00:00:00Z'
  },
  {
    id: '3',
    title: 'Traditional Kerala Backwater Villa',
    description: 'Stay in our ancestral Kerala home right on the backwaters. This 150-year-old traditional house features authentic Kerala architecture with modern comforts. Enjoy canoe rides, fishing, and authentic Kerala cuisine cooked in our traditional kitchen using coconut oil and spices from our garden.',
    short_description: 'Ancestral Kerala home on backwaters with traditional architecture',
    city: 'Alleppey',
    state: 'Kerala',
    coordinates: [9.4981, 76.3388], // Alleppey coordinates
    property_type: 'traditional_home',
    price_per_night: 4000,
    max_guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    images: [
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
      'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg',
      'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg'
    ],
    amenities: ['Backwater access', 'Traditional canoe', 'Spice garden', 'Ayurvedic treatments', 'Cooking classes', 'Free WiFi'],
    house_rules: ['Remove shoes before entering', 'Respect traditional customs', 'No alcohol in common areas', 'Quiet hours 10 PM - 6 AM'],
    host_id: '3',
    host: mockHosts[2],
    rating: 4.9,
    reviews_count: 89,
    available_from: '2024-01-01',
    available_to: '2024-12-31',
    created_at: '2024-01-20T00:00:00Z'
  },
  {
    id: '4',
    title: 'Rajasthani Heritage Villa in Udaipur',
    description: 'Experience royal Rajasthani hospitality in our restored heritage villa. Built in the 18th century, this property features traditional Rajasthani architecture, courtyards, and stunning lake views. Our family has preserved the authentic charm while adding modern amenities for your comfort.',
    short_description: 'Heritage villa with royal Rajasthani architecture and lake views',
    city: 'Udaipur',
    state: 'Rajasthan',
    coordinates: [24.5854, 73.7125], // Udaipur coordinates
    property_type: 'villa',
    price_per_night: 5500,
    max_guests: 10,
    bedrooms: 5,
    bathrooms: 4,
    images: [
      'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg',
      'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg',
      'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg'
    ],
    amenities: ['Lake views', 'Traditional courtyard', 'Royal dining', 'Cultural performances', 'Palace tours', 'Airport pickup'],
    house_rules: ['Dress modestly in common areas', 'Respect heritage property', 'No smoking', 'Photography restrictions in some areas'],
    host_id: '1',
    host: mockHosts[0],
    rating: 4.7,
    reviews_count: 124,
    available_from: '2024-01-01',
    available_to: '2024-12-31',
    created_at: '2024-01-25T00:00:00Z'
  },
  {
    id: '5',
    title: 'Unique Treehouse in Western Ghats',
    description: 'Sleep among the treetops in our eco-friendly treehouse in the Western Ghats. Built sustainably using local materials, this unique accommodation offers an immersive forest experience. Wake up to bird songs, spot wildlife, and enjoy organic meals prepared with ingredients from our permaculture farm.',
    short_description: 'Eco-friendly treehouse experience in Western Ghats forest',
    city: 'Coorg',
    state: 'Karnataka',
    coordinates: [12.3375, 75.8069], // Coorg coordinates
    property_type: 'treehouse',
    price_per_night: 3800,
    max_guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    images: [
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',
      'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg',
      'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg'
    ],
    amenities: ['Forest views', 'Wildlife spotting', 'Organic meals', 'Nature walks', 'Sustainable living', 'Stargazing deck'],
    house_rules: ['Minimal noise to respect wildlife', 'No plastic items', 'Compost organic waste', 'Follow eco-guidelines'],
    host_id: '2',
    host: mockHosts[1],
    rating: 4.9,
    reviews_count: 56,
    available_from: '2024-02-01',
    available_to: '2024-12-15',
    created_at: '2024-02-01T00:00:00Z'
  }
];

export const propertyTypes = ['farmhouse', 'cottage', 'villa', 'traditional_home', 'treehouse'];
export const states = ['Punjab', 'Himachal Pradesh', 'Kerala', 'Rajasthan', 'Karnataka', 'Goa', 'Uttarakhand', 'Tamil Nadu'];