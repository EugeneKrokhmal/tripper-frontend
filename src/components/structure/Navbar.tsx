import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { logout } from '../../redux/slices/authSlice';
import LanguageSwitcher from './LanguageSwitcher';
import CurrencySwitcher from '../CurrencySwitcher';
import { useTranslation } from 'react-i18next';
import BurgerMenu from './BurgerMenu';

const Navbar: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const userName = useSelector((state: RootState) => state.auth.userName);
    const userEmail = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { t } = useTranslation();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="z-50 fixed top-0 left-0 w-full bg-white border-gray-200 dark:bg-gray-900 shadow">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-1 rtl:space-x-reverse">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white md:text-2xl">🎃 Tripper</h3>
                </Link>

                <ul className="hidden md:flex mr-auto ml-16">
                    <li className="mx-4">
                        <Link to="/" className="flex items-center space-x-1 rtl:space-x-reverse">Home</Link>
                    </li>
                    <li className="mx-4">
                        <Link to="/dashboard" className="flex items-center space-x-1 rtl:space-x-reverse">Trips</Link>
                    </li>
                    <li className="mx-4">
                        <Link to="/faq" className="flex items-center space-x-1 rtl:space-x-reverse">How to use</Link>
                    </li>
                </ul>

                <div className="flex items-center md:order-2 space-x-3 rtl:space-x-reverse">
                    <LanguageSwitcher />
                    <CurrencySwitcher />

                    {isAuthenticated ? (
                        <div className="flex items-center space-x-2 relative">
                            <button
                                type="button"
                                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                id="user-menu-button"
                            >
                                <span className="sr-only">Open user menu</span>
                                <img
                                    className="w-8 h-8 border-2 border-white rounded-full dark:border-gray-800"
                                    src={`https://ui-avatars.com/api/?name=${userName}&background=random`}
                                    alt={userName || ''}
                                />
                            </button>

                            <BurgerMenu isOpened={isDrawerOpen} onClick={toggleDrawer} />

                        </div>
                    ) : (
                        <Link to="/login" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 dark:hover:text-white">
                            {t('login')}
                        </Link>
                    )}
                </div>

                <div className={`fixed inset-0 z-40 flex ${isDrawerOpen ? '' : 'pointer-events-none'}`}>
                    <div
                        className={`bg-gray-900 bg-opacity-50 w-full h-full transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100' : 'opacity-0'}`}
                        onClick={toggleDrawer}
                    ></div>

                    <div
                        className={`relative transform transition-transform duration-300 ease-in-out bg-white dark:bg-gray-800 w-64 h-full px-4 pt-16 pb-4  shadow-lg fixed right-0 ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
                            }`}
                    >
                        <div className="absolute right-4 top-4">
                            <svg onClick={toggleDrawer} className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>

                        <ul className="h-full flex flex-col">
                            <li className="mb-4">
                                <Link to="/" onClick={toggleDrawer}>{t('home')}</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="dashboard" onClick={toggleDrawer}>{t('myTrips')}</Link>
                            </li>
                            <li className="mb-4">
                                <Link to="faq" onClick={toggleDrawer}>{t('FAQ')}</Link>
                            </li>
                            <li className="mt-auto">
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    {t('logout')}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
