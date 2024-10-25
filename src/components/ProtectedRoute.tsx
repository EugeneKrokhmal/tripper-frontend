import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

// ProtectedRoute component checks if the user is authenticated
const ProtectedRoute: React.FC<{ children: React.ReactNode, redirectTo: string }> = ({ children, redirectTo }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to={redirectTo} />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
