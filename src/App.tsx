import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ExperiencesPage from './pages/ExperiencesPage';
import StaysPage from './pages/StaysPage';
import ExperienceDetailsPage from './pages/ExperienceDetailsPage';
import StayDetailsPage from './pages/StayDetailsPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import HostDashboard from './pages/HostDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/experiences" element={<ExperiencesPage />} />
            <Route path="/stays" element={<StaysPage />} />
            <Route path="/experience/:id" element={<ExperienceDetailsPage />} />
            <Route path="/stay/:id" element={<StayDetailsPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/host-dashboard" element={<HostDashboard />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;