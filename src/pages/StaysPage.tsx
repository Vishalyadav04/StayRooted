import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, MapPin, Search } from 'lucide-react';
import StayCard from '../components/StayCard';
import { mockStays, states, propertyTypes } from '../utils/mockData';
import { Stay } from '../types';

const StaysPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredStays, setFilteredStays] = useState<Stay[]>(mockStays);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedState, setSelectedState] = useState(searchParams.get('state') || '');
  const [selectedPropertyType, setSelectedPropertyType] = useState(searchParams.get('property_type') || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [guestCount, setGuestCount] = useState(parseInt(searchParams.get('guests') || '1'));

  useEffect(() => {
    let filtered = mockStays;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(stay => 
        stay.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stay.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stay.city.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply state filter
    if (selectedState) {
      filtered = filtered.filter(stay => stay.state === selectedState);
    }

    // Apply property type filter
    if (selectedPropertyType) {
      filtered = filtered.filter(stay => stay.property_type === selectedPropertyType);
    }

    // Apply price filter
    filtered = filtered.filter(stay => 
      stay.price_per_night >= priceRange[0] && stay.price_per_night <= priceRange[1]
    );

    // Apply guest count filter
    filtered = filtered.filter(stay => stay.max_guests >= guestCount);

    setFilteredStays(filtered);
  }, [searchQuery, selectedState, selectedPropertyType, priceRange, guestCount]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedState('');
    setSelectedPropertyType('');
    setPriceRange([0, 10000]);
    setGuestCount(1);
    setSearchParams({});
  };

  const propertyTypeLabels = {
    farmhouse: 'Farmhouse',
    cottage: 'Cottage',
    villa: 'Villa',
    traditional_home: 'Traditional Home',
    treehouse: 'Treehouse'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Discover Rural Homestays
          </h1>
          <p className="text-lg text-gray-600">
            {filteredStays.length} authentic homestays found across India
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search homestays..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="">All States</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>

            <select
              value={selectedPropertyType}
              onChange={(e) => setSelectedPropertyType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="">All Property Types</option>
              {propertyTypes.map(type => (
                <option key={type} value={type}>{propertyTypeLabels[type as keyof typeof propertyTypeLabels]}</option>
              ))}
            </select>

            <select
              value={guestCount}
              onChange={(e) => setGuestCount(parseInt(e.target.value))}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
              ))}
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span>Price Filter</span>
            </button>
          </div>

          {showFilters && (
            <div className="border-t border-gray-200 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range per Night: ₹{priceRange[0]} - ₹{priceRange[1]}
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="500"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="flex-1"
                    />
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-green-600 hover:text-green-700 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {filteredStays.length === 0 ? (
          <div className="text-center py-16">
            <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No homestays found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={clearFilters}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStays.map((stay) => (
              <StayCard key={stay.id} stay={stay} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StaysPage;