import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Star, Bed, Bath } from 'lucide-react';
import { Stay } from '../types';

interface StayCardProps {
  stay: Stay;
}

const StayCard: React.FC<StayCardProps> = ({ stay }) => {
  const propertyTypeLabels = {
    farmhouse: 'Farmhouse',
    cottage: 'Cottage',
    villa: 'Villa',
    traditional_home: 'Traditional Home',
    treehouse: 'Treehouse'
  };

  return (
    <Link to={`/stay/${stay.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <img
            src={stay.images[0]}
            alt={stay.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 bg-white bg-opacity-90 px-2 py-1 rounded-full text-sm font-semibold text-green-600">
            ₹{stay.price_per_night}/night
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
              {propertyTypeLabels[stay.property_type]}
            </span>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span>{stay.rating}</span>
              <span className="text-gray-400">({stay.reviews_count})</span>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
            {stay.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {stay.short_description}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{stay.city}, {stay.state}</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{stay.max_guests}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Bed className="h-4 w-4" />
                <span>{stay.bedrooms}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Bath className="h-4 w-4" />
                <span>{stay.bathrooms}</span>
              </div>
            </div>
          </div>
          
          <div className="pt-3 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <img
                src={stay.host?.avatar || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=40'}
                alt={stay.host?.name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-sm text-gray-600">
                Hosted by {stay.host?.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StayCard;