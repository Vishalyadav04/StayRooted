import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Utensils, Camera, Users, Heart } from 'lucide-react';
import ExperienceCard from '../components/ExperienceCard';
import StayCard from '../components/StayCard';
import { mockExperiences, mockStays, cities, categories } from '../utils/mockData';

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedCity) params.set('city', selectedCity);
    navigate(`/experiences?${params.toString()}`);
  };

  const featuredExperiences = mockExperiences.slice(0, 3);
  const featuredStays = mockStays.slice(0, 3);

  const categoryIcons = {
    'Food Tours': Utensils,
    'Cultural Experiences': Heart,
    'Historical Sites': Camera,
    'Family Fun': Users,
    'Hidden Gems': MapPin,
    'Adventure': MapPin
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-50 to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Discover Authentic
              <span className="text-orange-500"> India</span>
              <br />
              with <span className="text-green-700">Local Hosts</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect with passionate local Indians for personalized experiences. 
              From Delhi street food to Kerala backwaters, explore the real India 
              while supporting local communities.
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="What experience are you looking for?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="">Select City</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={handleSearch}
                  className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold flex items-center justify-center space-x-2"
                >
                  <Search className="h-5 w-5" />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Explore by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => {
              const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || MapPin;
              return (
                <Link
                  key={category}
                  to={`/experiences?category=${encodeURIComponent(category)}`}
                  className="group text-center p-6 rounded-lg border border-gray-200 hover:border-orange-500 hover:shadow-md transition-all duration-300"
                >
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500 transition-colors">
                    <IconComponent className="h-8 w-8 text-orange-600 group-hover:text-white" />
                  </div>
                  <h3 className="font-medium text-gray-900 group-hover:text-orange-600 transition-colors">
                    {category}
                  </h3>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Experiences */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Experiences
            </h2>
            <p className="text-lg text-gray-600">
              Handpicked authentic Indian experiences by our community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredExperiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/experiences"
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              View All Experiences
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Homestays */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Homestays
            </h2>
            <p className="text-lg text-gray-600">
              Experience authentic rural life with local families
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredStays.map((stay) => (
              <StayCard key={stay.id} stay={stay} />
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/stays"
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              View All Homestays
            </Link>
          </div>
        </div>
      </section>

      {/* Why StayRooted Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose StayRooted?
            </h2>
            <p className="text-lg text-gray-600">
              Supporting sustainable tourism and local communities across India
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Authentic Experiences</h3>
              <p className="text-gray-600">
                Connect with passionate locals who share their authentic culture, 
                traditions, and hidden gems that guidebooks miss.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Support Local Communities</h3>
              <p className="text-gray-600">
                Your bookings directly support local families and communities, 
                promoting sustainable tourism across India.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Personalized Adventures</h3>
              <p className="text-gray-600">
                Every experience can be customized to your interests, 
                dietary needs, and group size for a perfect fit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Explore the Real India?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of travelers discovering authentic Indian experiences
          </p>
          <Link
            to="/experiences"
            className="bg-white text-orange-600 px-8 py-3 rounded-lg hover:bg-orange-50 transition-colors font-semibold inline-block"
          >
            Start Your Journey
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;