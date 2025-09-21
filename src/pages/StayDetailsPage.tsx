import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, Users, Star, Heart, Share2, 
  Calendar, MessageCircle, CheckCircle, Bed, Bath,
  ArrowLeft, Wifi, Car, Utensils, Shield
} from 'lucide-react';
import { mockStays } from '../utils/mockData';
import { useAuth } from '../contexts/AuthContext';

const StayDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const stay = mockStays.find(s => s.id === id);

  if (!stay) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Homestay not found</h1>
          <button
            onClick={() => navigate('/stays')}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            Browse Homestays
          </button>
        </div>
      </div>
    );
  }

  const handleBooking = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }

    // Calculate nights
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (nights <= 0) {
      alert('Check-out date must be after check-in date');
      return;
    }

    // Mock booking process
    alert(`Booking confirmed for ${nights} nights! Total: ₹${stay.price_per_night * nights}`);
    navigate('/profile');
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    return Math.max(0, Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)));
  };

  const nights = calculateNights();
  const totalPrice = stay.price_per_night * nights;

  const propertyTypeLabels = {
    farmhouse: 'Farmhouse',
    cottage: 'Cottage',
    villa: 'Villa',
    traditional_home: 'Traditional Home',
    treehouse: 'Treehouse'
  };

  const amenityIcons: { [key: string]: React.ReactNode } = {
    'Free WiFi': <Wifi className="h-5 w-5" />,
    'Free parking': <Car className="h-5 w-5" />,
    'Farm-to-table meals': <Utensils className="h-5 w-5" />,
    'Air conditioning': <Shield className="h-5 w-5" />,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Homestays</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="relative h-96">
                <img
                  src={stay.images[currentImageIndex]}
                  alt={stay.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 flex space-x-2">
                  {stay.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors">
                    <Share2 className="h-5 w-5 text-gray-700" />
                  </button>
                  <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors">
                    <Heart className="h-5 w-5 text-gray-700" />
                  </button>
                </div>
              </div>
            </div>

            {/* Stay Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                    {propertyTypeLabels[stay.property_type]}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="font-semibold">{stay.rating}</span>
                    <span className="text-gray-500">({stay.reviews_count} reviews)</span>
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {stay.title}
                </h1>

                <div className="flex items-center space-x-6 text-gray-600 mb-6">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-5 w-5" />
                    <span>{stay.city}, {stay.state}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-5 w-5" />
                    <span>Up to {stay.max_guests} guests</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Bed className="h-5 w-5" />
                    <span>{stay.bedrooms} bedrooms</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Bath className="h-5 w-5" />
                    <span>{stay.bathrooms} bathrooms</span>
                  </div>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed">
                  {stay.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="border-t border-gray-200 pt-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stay.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      {amenityIcons[amenity] || <CheckCircle className="h-5 w-5 text-green-500" />}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* House Rules */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">House Rules</h3>
                <ul className="space-y-2">
                  {stay.house_rules.map((rule, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Host Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Meet Your Host</h3>
              <div className="flex items-start space-x-4">
                <img
                  src={stay.host?.avatar}
                  alt={stay.host?.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {stay.host?.name}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {stay.host?.bio}
                  </p>
                  <button className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors">
                    <MessageCircle className="h-5 w-5" />
                    <span>Contact Host</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <div className="mb-6">
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-3xl font-bold text-gray-900">₹{stay.price_per_night}</span>
                  <span className="text-gray-600">per night</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span>{stay.rating}</span>
                  <span>({stay.reviews_count} reviews)</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-in
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-out
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      min={checkIn || new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {Array.from({ length: stay.max_guests }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'guest' : 'guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {nights > 0 && (
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between text-gray-600 mb-2">
                    <span>₹{stay.price_per_night} x {nights} nights</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-gray-900 text-lg">
                    <span>Total</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>
              )}

              <button
                onClick={handleBooking}
                className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold mb-4"
              >
                {user ? 'Book Now' : 'Login to Book'}
              </button>

              <div className="text-center text-sm text-gray-500">
                Free cancellation up to 48 hours before check-in
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StayDetailsPage;