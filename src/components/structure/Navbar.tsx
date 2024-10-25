import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { logout } from '../../redux/slices/authSlice';
import LanguageSwitcher from './LanguageSwitcher';
import CurrencySwitcher from '../CurrencySwitcher';
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const userName = useSelector((state: RootState) => state.auth.userName);
    const userEmail = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { t } = useTranslation();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="z-50 fixed top-0 left-0 w-full bg-white border-gray-200 dark:bg-gray-900 shadow">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-1 rtl:space-x-reverse">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white md:text-2xl">🎃 Tripper</h3>
                </Link>

                <div className="flex items-center md:order-2 space-x-3 rtl:space-x-reverse">
                    <LanguageSwitcher />
                    <CurrencySwitcher />

                    {isAuthenticated ? (
                        <div className="flex items-center space-x-2 relative">
                            <span className="text-sm text-gray-800 dark:text-gray-300">{userName}</span>
                            <button
                                type="button"
                                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                id="user-menu-button"
                                aria-expanded={isDropdownOpen ? 'true' : 'false'}
                                onClick={toggleDropdown} // Toggle dropdown
                            >
                                <span className="sr-only">Open user menu</span>
                                <div className="w-8 h-8 grid content-center">🫠</div>
                            </button>

                            {/* Dropdown menu */}
                            {isDropdownOpen && (
                                <div
                                    className="z-50 absolute top-10 right-0 mt-2 w-48 bg-white rounded-lg shadow dark:bg-gray-700"
                                    id="user-dropdown"
                                    ref={dropdownRef} // Ref to detect outside clicks
                                >
                                    <div className="px-4 py-3">
                                        <span className="block text-sm text-gray-900 dark:text-white">{userName}</span>
                                        <span className="block text-sm text-gray-500 dark:text-gray-300 truncate dark:text-gray-400">{userEmail}</span>
                                    </div>
                                    <ul className="py-2">
                                        <li>
                                            <Link
                                                to="/"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                onClick={() => setIsDropdownOpen(false)} // Close on item select
                                            >
                                                {t('home')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/dashboard"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                onClick={() => setIsDropdownOpen(false)} // Close on item select
                                            >
                                                {t('myTrips')}
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/settings"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                onClick={() => setIsDropdownOpen(false)} // Close on item select
                                            >
                                                {t('settings')}
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() => {
                                                    handleLogout();
                                                    setIsDropdownOpen(false); // Close on logout
                                                }}
                                                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                            >
                                                {t('logout')}
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white"
                        >
                            {t('login')}
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
