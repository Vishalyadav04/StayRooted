import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, Clock, Users, Star, Heart, Share2, 
  Calendar, MessageCircle, CheckCircle, Camera,
  ArrowLeft
} from 'lucide-react';
import { mockExperiences } from '../utils/mockData';
import { useAuth } from '../contexts/AuthContext';

const ExperienceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState('');
  const [groupSize, setGroupSize] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const experience = mockExperiences.find(exp => exp.id === id);

  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Experience not found</h1>
          <button
            onClick={() => navigate('/experiences')}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Browse Experiences
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

    if (!selectedDate) {
      alert('Please select a date');
      return;
    }

    // Mock booking process
    alert('Booking confirmed! You will receive a confirmation email shortly.');
    navigate('/profile');
  };

  const totalPrice = experience.price * groupSize;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Experiences</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="relative h-96">
                <img
                  src={experience.images[currentImageIndex]}
                  alt={experience.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 flex space-x-2">
                  {experience.images.map((_, index) => (
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

            {/* Experience Info */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                    {experience.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="font-semibold">{experience.rating}</span>
                    <span className="text-gray-500">({experience.reviews_count} reviews)</span>
                  </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {experience.title}
                </h1>

                <div className="flex items-center space-x-6 text-gray-600 mb-6">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-5 w-5" />
                    <span>{experience.city}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-5 w-5" />
                    <span>{experience.duration} hours</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-5 w-5" />
                    <span>Max {experience.max_group_size} guests</span>
                  </div>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed">
                  {experience.description}
                </p>
              </div>

              {/* What's Included */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What's Included</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Expert local guide</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>All tastings/entrance fees</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Cultural insights & stories</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Small group experience</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Host Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Meet Your Host</h3>
              <div className="flex items-start space-x-4">
                <img
                  src={experience.host?.avatar}
                  alt={experience.host?.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {experience.host?.name}
                  </h4>
                  <p className="text-gray-600 mb-4">
                    {experience.host?.bio}
                  </p>
                  <button className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors">
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
                  <span className="text-3xl font-bold text-gray-900">₹{experience.price}</span>
                  <span className="text-gray-600">per person</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span>{experience.rating}</span>
                  <span>({experience.reviews_count} reviews)</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Group Size
                  </label>
                  <select
                    value={groupSize}
                    onChange={(e) => setGroupSize(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {Array.from({ length: experience.max_group_size }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'guest' : 'guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-gray-600 mb-2">
                  <span>₹{experience.price} x {groupSize} guests</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-900 text-lg">
                  <span>Total</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>

              <button
                onClick={handleBooking}
                className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold mb-4"
              >
                {user ? 'Book Now' : 'Login to Book'}
              </button>

              <div className="text-center text-sm text-gray-500">
                Free cancellation up to 24 hours before
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetailsPage;