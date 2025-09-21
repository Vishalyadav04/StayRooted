import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { MapPin, Star, Clock, Users } from 'lucide-react';
import { Experience } from '../types';
import L from 'leaflet';

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapViewProps {
  experiences: Experience[];
}

const MapView: React.FC<MapViewProps> = ({ experiences }) => {
  // Calculate bounds to fit all markers
  const bounds = experiences.length > 0 
    ? experiences.map(exp => exp.coordinates as [number, number])
    : [[20.5937, 78.9629]]; // Default to center of India

  return (
    <div className="h-96 w-full rounded-lg overflow-hidden shadow-md">
      <MapContainer
        bounds={bounds}
        className="h-full w-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {experiences.map((experience) => (
          <Marker
            key={experience.id}
            position={experience.coordinates}
          >
            <Popup className="custom-popup">
              <div className="p-2 min-w-64">
                <div className="flex space-x-3">
                  <img
                    src={experience.images[0]}
                    alt={experience.title}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">
                      {experience.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-xs text-gray-600 mb-2">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{experience.city}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span>{experience.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{experience.duration}h</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3" />
                          <span>Max {experience.max_group_size}</span>
                        </div>
                      </div>
                      <span className="font-semibold text-orange-600 text-sm">
                        ₹{experience.price}
                      </span>
                    </div>
                    <Link
                      to={`/experience/${experience.id}`}
                      className="inline-block mt-2 bg-orange-500 text-white px-3 py-1 rounded text-xs hover:bg-orange-600 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;