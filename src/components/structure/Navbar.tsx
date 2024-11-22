import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { logout } from '../../redux/slices/authSlice';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import BurgerMenu from './BurgerMenu';
import DarkModeToggle from './DarkModeToggle';
import UserIcon from '../elements/UserIcon';

const Navbar: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const userName = useSelector((state: RootState) => state.auth.userName);
    const profilePhoto = useSelector((state: RootState) => state.auth.profilePhoto);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const { t } = useTranslation();
    const dropdownRef = useRef<HTMLDivElement>(null);
    const lastScrollY = useRef(0);
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '';

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

    // Scroll event listener to show/hide navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY.current && window.scrollY > 100) {
                setIsNavbarVisible(false); // Hide navbar on scroll down
            } else {
                setIsNavbarVisible(true); // Show navbar on scroll up
            }
            lastScrollY.current = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <nav
                className={`z-50 fixed top-0 left-0 w-full bg-white border-zinc-200 dark:bg-zinc-900 shadow transition-transform duration-300`}
            >
                <div className={`transition-all duration-300 max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 ${isNavbarVisible ? 'py-4 h-20' : 'py-1'
                    }`}>
                    <Link to="/" className="flex items-center space-x-1 rtl:space-x-reverse">
                        <div className="text-2xl font-extrabold text-zinc-900 dark:text-white flex items-center">
                            <span
                                className={`transition-all duration-300 text-gradient ${isNavbarVisible ? 'text-normal' : 'text-sm'
                                    }`}
                            >
                                {t('Tripper')}
                            </span>
                        </div>
                    </Link>

                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-2 relative">
                                <ul className="hidden md:flex gap-4 mx-8 text-sm text-zinc-900 dark:text-zinc-100">
                                    <li>
                                        <Link to="/new-trip">{t('createTrip')}</Link>
                                    </li>
                                    <li>
                                        <Link to="dashboard">{t('myTrips')}</Link>
                                    </li>
                                </ul>
                                <button
                                    type="button"
                                    className="flex text-sm bg-zinc-800 dark:bg-zinc-100 rounded-full focus:ring-4 focus:ring-zinc-300 dark:focus:ring-zinc-600"
                                >
                                    <span className="sr-only">Open user menu</span>

                                    <Link to={'/settings'}>
                                        <UserIcon
                                            userName={userName || ''}
                                            profilePhoto={profilePhoto || ''}
                                            size={`${isNavbarVisible ? 'md' : 'xs'}`}
                                        />
                                    </Link>
                                </button>

                                <BurgerMenu isOpened={isDrawerOpen} onClick={toggleDrawer} />
                            </div>
                        ) : (
                            <Link to="/login" className="block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-200 dark:hover:text-white">
                                {t('login')}
                            </Link>
                        )}
                    </div>

                    {/* Drawer for Mobile Navigation */}
                    <div className={`fixed inset-0 z-40 ${isDrawerOpen ? 'backdrop-blur-sm' : 'pointer-events-none'}`}>
                        <div
                            className={`bg-zinc-900 bg-opacity-50 w-full h-full transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100' : 'opacity-0'}`}
                            onClick={toggleDrawer}
                        ></div>

                        <div
                            className={`flex flex-col absolute top-0 transform transition-transform duration-300 ease-in-out bg-white dark:bg-zinc-800 w-64 h-full px-4 pt-8 pb-24 shadow-lg right-0 ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
                                }`}
                        >
                            <div className="flex w-full justify-between items-center">
                                <div className="flex gap-2">
                                    <LanguageSwitcher />
                                </div>
                                <DarkModeToggle />
                                <div>
                                    <svg onClick={toggleDrawer} className="w-6 h-6 text-zinc-900 dark:text-zinc-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            </div>

                            <hr className="my-4" />

                            <div className="flex flex-col">
                                <ul className="flex flex-col">
                                    <li className="mb-4 font-bold text-zinc-900 dark:text-zinc-100">
                                        <Link to="/" onClick={toggleDrawer}>{t('home')}</Link>
                                    </li>
                                    <li className="mb-4 font-bold text-zinc-900 dark:text-zinc-100">
                                        <Link to="/dashboard" onClick={toggleDrawer}>{t('myTrips')}</Link>
                                    </li>
                                    <li className="mb-4 font-bold text-zinc-900 dark:text-zinc-100">
                                        <Link to="/new-trip" onClick={toggleDrawer}>{t('createTrip')}</Link>
                                    </li>
                                </ul>
                            </div>

                            <ul className="flex flex-col mt-auto">
                                <li className="mb-4 text-zinc-900 dark:text-zinc-100">
                                    <Link to="/blog" onClick={toggleDrawer}>{t('Blog')}</Link>
                                </li>
                                <li className="mb-4 text-zinc-900 dark:text-zinc-100">
                                    <Link to="/faq" onClick={toggleDrawer}>{t('FAQ')}</Link>
                                </li>
                                <li className="mb-4 text-zinc-900 dark:text-zinc-100">
                                    <Link to="settings" onClick={toggleDrawer}>{t('settings')}</Link>
                                </li>
                                <li>
                                    <button
                                        className="text-zinc-900 dark:text-zinc-100"
                                        onClick={() => {
                                            handleLogout();
                                            toggleDrawer();
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
        </>
    );
};

export default Navbar;
