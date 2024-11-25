import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
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
import SettingsPage from './pages/SettingsPage';
import Blog from './pages/Blog';
import ForgotPassword from './pages/ForgorPassword';
import ResetPassword from './pages/ResetPassword';
import BottomNav from './components/structure/BottomNav';
import LogoPage from './pages/LogoPage';


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
            <div className="overflow-y-auto scroller h-full">
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/landing" element={<LandingPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/logo" element={<LogoPage />} />

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

                    <Route
                        path="/settings"
                        element={
                            <ProtectedRoute>
                                <SettingsPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/new-trip"
                        element={
                            <ProtectedRoute>
                                <CreateTripPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
            <BottomNav />
            <Footer />
            {/* <BugReportPopup /> */}
        </Router>
    );
}

export default App;
