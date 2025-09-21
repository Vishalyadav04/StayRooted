import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plus, MapPin, Clock, Users, Star, Calendar, 
  Eye, Edit, Trash2, Upload, Camera
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockExperiences, mockStays, cities, categories, propertyTypes, states } from '../utils/mockData';

const HostDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'experiences' | 'create'>('overview');
  const [activeSection, setActiveSection] = useState<'experiences' | 'stays'>('experiences');

  // Form state for creating new experiences
  const [experienceForm, setExperienceForm] = useState({
    title: '',
    description: '',
    short_description: '',
    city: '',
    category: '',
    price: 0,
    duration: 1,
    max_group_size: 1
  });

  // Form state for creating new homestays
  const [stayForm, setStayForm] = useState({
    title: '',
    description: '',
    short_description: '',
    city: '',
    state: '',
    property_type: 'farmhouse',
    price_per_night: 0,
    max_guests: 1,
    bedrooms: 1,
    bathrooms: 1
  });

  if (!user || user.role !== 'host') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-4">
            You need to be a host to access this dashboard
          </p>
          <Link
            to="/register"
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Sign Up as Host
          </Link>
        </div>
      </div>
    );
  }

  const hostedExperiences = mockExperiences.filter(exp => exp.host_id === user.id);
  const hostedStays = mockStays.filter(stay => stay.host_id === user.id);

  const handleCreateExperience = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API
    alert('Experience created successfully! (This is a demo)');
    setActiveTab('experiences');
    // Reset form
    setExperienceForm({
      title: '',
      description: '',
      short_description: '',
      city: '',
      category: '',
      price: 0,
      duration: 1,
      max_group_size: 1
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setExperienceForm(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'duration' || name === 'max_group_size' 
        ? parseInt(value) || 0 
        : value
    }));
  };

  const handleStayInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStayForm(prev => ({
      ...prev,
      [name]: name === 'price_per_night' || name === 'max_guests' || name === 'bedrooms' || name === 'bathrooms'
        ? parseInt(value) || 0 
        : value
    }));
  };

  const handleCreateStay = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API
    alert('Homestay created successfully! (This is a demo)');
    setActiveTab('experiences');
    // Reset form
    setStayForm({
      title: '',
      description: '',
      short_description: '',
      city: '',
      state: '',
      property_type: 'farmhouse',
      price_per_night: 0,
      max_guests: 1,
      bedrooms: 1,
      bathrooms: 1
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600">Manage your experiences and connect with travelers</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/profile"
                className="text-gray-600 hover:text-orange-600 transition-colors"
              >
                View Profile
              </Link>
              <button
                onClick={() => setActiveTab('create')}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Create New</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: MapPin },
                { id: 'experiences', label: 'My Experiences', icon: Calendar },
                { id: 'create', label: 'Create New', icon: Plus }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Experiences</p>
                    <p className="text-3xl font-bold text-gray-900">{hostedExperiences.length}</p>
                  </div>
                  <MapPin className="h-12 w-12 text-orange-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Bookings</p>
                    <p className="text-3xl font-bold text-gray-900">47</p>
                  </div>
                  <Calendar className="h-12 w-12 text-green-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Earnings</p>
                    <p className="text-3xl font-bold text-gray-900">₹45,600</p>
                  </div>
                  <Star className="h-12 w-12 text-yellow-500" />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Average Rating</p>
                    <p className="text-3xl font-bold text-gray-900">4.8</p>
                  </div>
                  <Star className="h-12 w-12 text-yellow-500" />
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[1, 2, 3].map((booking) => (
                    <div key={booking} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                          JD
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">John Doe</p>
                          <p className="text-sm text-gray-600">Old Delhi Heritage Food Walk</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">₹3,000</p>
                        <p className="text-sm text-gray-600">Feb 15, 2024</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'experiences' && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">My Experiences</h2>
              <button
                onClick={() => setActiveTab('create')}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add New</span>
              </button>
            </div>
            <div className="p-6">
              {hostedExperiences.length === 0 ? (
                <div className="text-center py-12">
                  <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    No experiences yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Create your first experience to start hosting travelers
                  </p>
                  <button
                    onClick={() => setActiveTab('create')}
                    className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Create Your First Experience
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {hostedExperiences.map((experience) => (
                    <div key={experience.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex space-x-4">
                          <img
                            src={experience.images[0]}
                            alt={experience.title}
                            className="w-24 h-24 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {experience.title}
                            </h3>
                            <p className="text-gray-600 mb-3 line-clamp-2">
                              {experience.short_description}
                            </p>
                            <div className="flex items-center space-x-6 text-sm text-gray-600">
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{experience.city}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{experience.duration}h</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="h-4 w-4" />
                                <span>Max {experience.max_group_size}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4" />
                                <span>{experience.rating} ({experience.reviews_count})</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <p className="text-2xl font-bold text-gray-900 mb-2">
                            ₹{experience.price}
                          </p>
                          <div className="flex items-center space-x-2">
                            <Link
                              to={`/experience/${experience.id}`}
                              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                              title="View"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                            <button
                              className="p-2 text-gray-600 hover:text-orange-600 transition-colors"
                              title="Edit"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'create' && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center space-x-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Create New Listing</h2>
                  <p className="text-gray-600">Share your local expertise or homestay with travelers</p>
                </div>
                <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setActiveSection('experiences')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === 'experiences'
                        ? 'bg-white text-orange-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Experience
                  </button>
                  <button
                    onClick={() => setActiveSection('stays')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === 'stays'
                        ? 'bg-white text-green-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Homestay
                  </button>
                </div>
              </div>
            </div>
            
            {activeSection === 'experiences' ? (
              <form onSubmit={handleCreateExperience} className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={experienceForm.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Old Delhi Heritage Food Walk"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <select
                    name="city"
                    required
                    value={experienceForm.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select City</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    required
                    value={experienceForm.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Person (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    required
                    min="0"
                    value={experienceForm.price}
                    onChange={handleInputChange}
                    placeholder="1500"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (Hours) *
                  </label>
                  <input
                    type="number"
                    name="duration"
                    required
                    min="1"
                    max="24"
                    value={experienceForm.duration}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Group Size *
                  </label>
                  <input
                    type="number"
                    name="max_group_size"
                    required
                    min="1"
                    max="50"
                    value={experienceForm.max_group_size}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description *
                </label>
                <input
                  type="text"
                  name="short_description"
                  required
                  value={experienceForm.short_description}
                  onChange={handleInputChange}
                  placeholder="Brief one-line description for cards"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows={5}
                  value={experienceForm.description}
                  onChange={handleInputChange}
                  placeholder="Describe your experience in detail. What will travelers see, do, and learn?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Photos
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Upload high-quality photos of your experience</p>
                  <button
                    type="button"
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2 mx-auto"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Choose Files</span>
                  </button>
                  <p className="text-xs text-gray-500 mt-2">
                    Upload at least 3 photos. JPG, PNG up to 5MB each
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setActiveTab('experiences')}
                  className="px-6 py-2 text-gray-600 hover:text-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-8 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Create Experience
                </button>
              </div>
              </form>
            ) : (
              <form onSubmit={handleCreateStay} className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Homestay Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={stayForm.title}
                      onChange={handleStayInputChange}
                      placeholder="e.g., Rustic Farmhouse in Punjab Countryside"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type *
                    </label>
                    <select
                      name="property_type"
                      required
                      value={stayForm.property_type}
                      onChange={handleStayInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      {propertyTypes.map(type => (
                        <option key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={stayForm.city}
                      onChange={handleStayInputChange}
                      placeholder="Enter city name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <select
                      name="state"
                      required
                      value={stayForm.state}
                      onChange={handleStayInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select State</option>
                      {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price per Night (₹) *
                    </label>
                    <input
                      type="number"
                      name="price_per_night"
                      required
                      min="0"
                      value={stayForm.price_per_night}
                      onChange={handleStayInputChange}
                      placeholder="2500"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Guests *
                    </label>
                    <input
                      type="number"
                      name="max_guests"
                      required
                      min="1"
                      max="20"
                      value={stayForm.max_guests}
                      onChange={handleStayInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bedrooms *
                    </label>
                    <input
                      type="number"
                      name="bedrooms"
                      required
                      min="1"
                      max="10"
                      value={stayForm.bedrooms}
                      onChange={handleStayInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bathrooms *
                    </label>
                    <input
                      type="number"
                      name="bathrooms"
                      required
                      min="1"
                      max="10"
                      value={stayForm.bathrooms}
                      onChange={handleStayInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Short Description *
                  </label>
                  <input
                    type="text"
                    name="short_description"
                    required
                    value={stayForm.short_description}
                    onChange={handleStayInputChange}
                    placeholder="Brief one-line description for cards"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detailed Description *
                  </label>
                  <textarea
                    name="description"
                    required
                    rows={5}
                    value={stayForm.description}
                    onChange={handleStayInputChange}
                    placeholder="Describe your homestay in detail. What makes it special? What experiences do you offer?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Homestay Photos
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Upload high-quality photos of your homestay</p>
                    <button
                      type="button"
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2 mx-auto"
                    >
                      <Upload className="h-4 w-4" />
                      <span>Choose Files</span>
                    </button>
                    <p className="text-xs text-gray-500 mt-2">
                      Upload at least 5 photos. JPG, PNG up to 5MB each
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setActiveTab('experiences')}
                    className="px-6 py-2 text-gray-600 hover:text-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-8 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Create Homestay
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HostDashboard;