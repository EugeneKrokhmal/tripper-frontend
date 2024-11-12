import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import Dashboard from './pages/UserTrips';
import Navbar from './components/structure/Navbar';
import Footer from './components/structure/Footer';
import NotFoundPage from './pages/NotFoundPage';
import TripDetailsPage from './pages/TripDetailsPage';
import JoinTripPage from './pages/JoinTripPage';
import LandingPage from './pages/LandingPage';
import ScrollToTop from './components/structure/ScrollToTop';
import FAQ from './pages/FAQ';
import CreateTripPage from './pages/CreateTripPage';
import BugReportPopup from './components/structure/BugReportPopup';
import SettingsPage from './pages/SettingsPage';
import Blog from './pages/Blog';

// ProtectedRoute component to guard protected pages
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const token = useSelector((state: RootState) => state.auth.token);

    if (!token) {
        return <LoginPage />;
    }

    return <>{children}</>;
};

function App() {
    return (
        <Router>
            <ScrollToTop />
            <Navbar />
            <div className="pt-16 relative min-h-screen">
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="/landing" element={<LandingPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/new-trip" element={<CreateTripPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/blog" element={<Blog />} />

                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/join/:tripId/:token"
                        element={
                            <ProtectedRoute>
                                <JoinTripPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/trip/:tripId"
                        element={
                            <ProtectedRoute>
                                <TripDetailsPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
            <Footer />
            <BugReportPopup />
        </Router>
    );
}

export default App;
