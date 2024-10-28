import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
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
import ExpenseDetailPage from './pages/ExpenseDetailPage';

// ProtectedRoute component to guard protected pages
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const token = useSelector((state: RootState) => state.auth.token);

    if (!token) {
        return <LoginPage />; // Redirect to login if not authenticated
    }

    return <>{children}</>;
};

function App() {
    const token = useSelector((state: RootState) => state.auth.token || ''); // Fallback to empty string if token is null
    const participants = useSelector((state: RootState) => state.trips.currentTripParticipants || []);
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || ''; // Fallback to empty string if undefined

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/landing" element={<LandingPage />} />
                <Route path="*" element={<NotFoundPage />} />

                {/* Expense Detail Page with dynamic token and participants */}
                <Route
                    path="/trips/:tripId/expenses/:expenseId/edit"
                    element={
                        <ProtectedRoute>
                            <ExpenseDetailPage participants={participants} token={token} API_BASE_URL={API_BASE_URL} />
                        </ProtectedRoute>
                    }
                />

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
            <Footer />
        </Router>
    );
}

export default App;
