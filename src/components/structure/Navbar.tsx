import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { logout } from '../../redux/slices/authSlice';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import BurgerMenu from './BurgerMenu';
import DarkModeToggle from './DarkModeToggle';
import { useDarkMode } from '../../context/DarkModeContext';

const Navbar: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const userName = useSelector((state: RootState) => state.auth.userName);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const { t } = useTranslation();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { isDarkMode } = useDarkMode();

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
        <nav className="z-50 fixed top-0 left-0 w-full h-20 bg-white border-zinc-200 dark:bg-zinc-900 shadow">
            <div className="max-w-screen-xl h-full flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-1 rtl:space-x-reverse">
                    <div className="text-2xl font-extrabold text-zinc-900 dark:text-white flex items-center">
                        <span className="mr-1">
                            <svg version="1.0"
                                xmlns="http://www.w3.org/2000/svg" className="bg-gradient text-white dark:text-zinc-900 w-6 h-6 object-cover" width="20" height="20" viewBox="0 0 832 832">
                                <path fill="currentColor" d="M0 416v416h832V0H0v416zM453 7.1c3.6.6 10.8 1.6 16 2.3 5.2.8 12.7 2.1 16.5 3.1 18.7 4.4 24.2 5.8 26 6.5 1.1.5 3.8 1.4 6 2.1 2.2.6 6.2 2 8.9 3 2.7 1.1 5.6 1.9 6.5 1.9 1 0 2.1.4 2.6.9.6.5 3.6 1.8 6.7 3 3.2 1.1 6.6 2.5 7.5 3 3.2 1.8 19.3 9.1 20.1 9.1.4.1 1.8 1 3.1 2l2.4 2-8.3 13.3c-7.8 12.4-10 15.9-18.9 29.7-5 7.7-5.8 9-8.1 13.2-1.1 2-3.3 5.7-5 8.1-1.6 2.5-3 4.7-3 5 0 .3-2.7 4.6-6 9.6s-6 9.4-6 9.7c0 .4-1.1 2.1-2.3 3.8-2.4 3.1-4.3 6.1-17.7 28.1-4 6.6-10 16.3-13.4 21.5-5.4 8.3-11.4 17.8-15.3 24.5-1.9 3.2-9.8 15.7-19.8 31.5-5.1 8-10.2 16.1-11.3 18-1.1 1.9-3.7 6.3-5.8 9.7-2.2 3.4-6.9 11.1-10.6 17.1-9.6 15.5-9.8 15.6-14.9 6.9-1.6-2.9-4.8-8.1-7.1-11.7-2.2-3.6-4.8-7.9-5.8-9.5-.9-1.7-3.7-6.2-6.1-10-5.5-8.6-17.4-28.1-23.4-38.3-1.1-1.9-3.2-5.3-4.6-7.5-1.4-2.3-4.4-7.1-6.6-10.7-2.2-3.6-6.6-10.8-9.8-16-5.2-8.5-8.8-14.4-16-26-1.2-1.9-3.8-6.1-5.8-9.2-2-3.2-3.7-6-3.7-6.2 0-.2-2.2-4-5-8.3-2.7-4.3-6.2-10.1-7.8-12.8-1.6-2.8-6-10-9.7-16-3.7-6.1-7.9-12.8-9.2-15-1.3-2.2-4.2-6.9-6.5-10.5-2.2-3.6-4.9-8.1-6-10-1.1-1.9-4.2-6.8-6.8-11-14.7-23.4-14.7-23.4-10.5-25 2.6-1 16.5-7.4 19.8-9.1.9-.5 4.3-1.9 7.5-3 3.1-1.2 6.1-2.5 6.7-3 .5-.5 1.6-.9 2.4-.9.9 0 3.8-.8 6.6-1.9 24.6-9.2 61-16.8 87.5-18.2 16.5-.8 55.1-.1 64 1.2zM227.7 82.9c3.9 6.4 9.3 15.2 11.9 19.6 2.6 4.4 7.2 11.7 10.1 16.3 2.9 4.5 6.2 9.9 7.3 12 1.1 2 3.8 6.4 6 9.7 2.2 3.3 4.4 6.9 4.9 8 .6 1.1 3.2 5.6 6 10 8.5 13.6 13.6 22 14 22.9.2.6 2.7 4.6 5.5 9 5.8 9.1 17.4 28.1 24.1 39.4 1.1 1.9 3.3 5.5 4.9 8 1.7 2.6 4.4 6.9 6.1 9.7 1.8 2.7 4.4 7 5.8 9.5 1.5 2.5 6.7 11 11.6 19 4.9 8 11.1 18.1 13.7 22.5 2.7 4.4 7.3 12 10.4 17 3.1 4.9 7.1 11.5 9 14.5 14.1 23.5 18.6 30.4 21.1 32.4 3.7 3.2 11.8 5.5 47.4 13.7 5 1.2 12.2 2.9 16 3.9 3.9 1 11.3 2.8 16.5 4 5.2 1.1 11.8 2.7 14.5 3.5 5 1.4 14 3.6 25 5.9 3.3.7 8.9 2.1 12.5 3 9 2.4 19.8 5 31 7.6 5.2 1.2 12.9 3 17 4 4.1 1.1 11.6 2.8 16.5 4 5 1.2 12.4 2.9 16.5 4 4.1 1 8.9 2.1 10.5 2.5 1.7.3 5.3 1.2 8 1.9 2.8.8 7.5 1.9 10.5 2.6 3 .6 6.6 1.5 8 2 1.4.4 7 1.8 12.5 3s12.3 2.8 15 3.5c2.8.7 6.6 1.6 8.5 2 1.9.3 6.4 1.4 10 2.4 3.6 1 11 2.8 16.5 4.1 5.5 1.2 12.5 2.9 15.5 3.7 3 .8 6.5 1.7 7.8 2 1.2.3 2.2 1 2.2 1.5s.4.6 1 .3c.9-.6-2.3 10.1-4.1 13.8-.5.9-1.6 3.9-2.5 6.5-.9 2.6-2.4 6.5-3.4 8.7-1 2.2-3.5 7.8-5.5 12.5-7.9 17.8-25.4 47.3-36 60.5-2.2 2.8-4.9 6.4-6 8-6.4 9.1-45.1 48.7-149.9 153.5L414 828.5l-118.1-118C231 645.6 171.4 585.5 163.6 577c-15.4-16.8-21.9-25-33.9-42.9-6.6-9.9-22.7-37.8-22.7-39.5 0-.3-1.6-4-3.6-8.3-6-13.1-7.1-15.6-8.4-19.8-.7-2.2-1.6-4.4-2.1-5-.5-.5-.9-1.6-.9-2.6 0-.9-.8-3.8-1.9-6.5C80.6 427.6 73 380.1 73 345.5c0-34.5 7.6-81.1 17.1-105.9 1.1-2.7 1.9-5.4 1.9-6.1 0-1 3.4-10.2 6-16 11.6-26.5 20.5-43.3 31.2-59.4 22.1-32.7 50.2-62.7 79.2-84.4 9-6.7 9.1-6.7 10.6-4.6.8 1.2 4.7 7.4 8.7 13.8zm393.1-8.2c19 14 54.4 49.3 63 62.7 1.3 2.2 3.3 4.9 4.4 6 2.6 2.9 18.2 26.2 21.1 31.6 10.2 19.2 13.8 26.3 16.2 32 1.5 3.6 3.5 8.3 4.6 10.5 1 2.2 3.1 8.1 4.8 13 1.6 5 3.4 10.3 4 12 3.2 9.1 5.6 18.8 10.6 42.5 4.8 23 6.7 66.4 3.9 90.6-.7 6.6-1.5 14.4-1.8 17.4-.5 5.1-2.3 12.8-2.5 10.5-.1-.6-2-1.1-4.4-1.3-2.3-.1-7.8-1.2-12.2-2.3-11.4-2.9-25.5-6.3-41-10-4.4-1.1-11.6-2.8-16-3.9s-12.3-2.9-17.5-4.1c-5.2-1.2-10.3-2.5-11.2-3-.9-.5-2.6-.9-3.8-.9-1.2 0-5.4-.9-9.3-1.9-4-1.1-11.5-2.9-16.7-4.1-5.2-1.2-12.9-3-17-4.1-4.1-1-19-4.6-33-8-14-3.3-28.9-6.9-33-7.9-18.8-4.6-24.1-5.9-33-8-5.2-1.2-12.9-3-17-4-15.8-4-23.6-5.9-27.7-6.5-6.5-1-7.1-2.5-3.1-9 5.5-9.4 14.6-24 19.6-31.8 2-3.1 6.4-10.1 9.7-15.5 3.2-5.3 6.7-10.8 7.6-12.2.9-1.4 3.5-5.7 5.9-9.5 7.1-11.5 8.4-13.6 14.2-22.5 3-4.7 8.5-13.5 12.2-19.5 8.3-13.7 18.2-29.6 22-35.5 4.9-7.6 7-10.9 16.6-26.5 5.1-8.3 9.8-16 10.4-17.1.7-1.2 2.8-4.6 4.8-7.5 3.6-5.6 8.4-13 13.2-20.9 13.3-21.6 23-37 23.4-37 .2 0 3.8 2.6 8 5.7z" />
                            </svg>
                        </span>
                        <span className="text-gradient">
                            {t('Tripper')}
                        </span>
                    </div>
                </Link>

                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    {isAuthenticated ? (
                        <div className="flex items-center space-x-2 relative">
                            <ul className="hidden md:flex gap-4 mx-8 text-sm text-zinc-900 dark:text-zinc-100">
                                <li>
                                    <Link to="/">{t('home')}</Link>
                                </li>
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
                                <img
                                    className="w-8 h-8 rounded-full"
                                    src={`https://ui-avatars.com/api/?name=${userName}&background=random`}
                                    alt={userName || ''}
                                />
                            </button>

                            <BurgerMenu isOpened={isDrawerOpen} onClick={toggleDrawer} />
                        </div>
                    ) : (
                        <Link to="/login" className="block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-200 dark:hover:text-white">
                            {t('login')}
                        </Link>
                    )}
                </div>

                <div className={`fixed inset-0 z-40 ${isDrawerOpen ? 'backdrop-blur-sm' : 'pointer-events-none'}`}>
                    <div
                        className={`bg-zinc-900 bg-opacity-50 w-full h-full transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100' : 'opacity-0'}`}
                        onClick={toggleDrawer}
                    ></div>

                    <div
                        className={`flex flex-col absolute top-0 transform transition-transform duration-300 ease-in-out bg-white dark:bg-zinc-800 w-64 h-full px-4 pt-8 pb-8 shadow-lg right-0 ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
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
                                    <Link to="/new-trip" onClick={toggleDrawer}>{t('createTrip')}</Link>
                                </li>
                                <li className="mb-4 font-bold text-zinc-900 dark:text-zinc-100">
                                    <Link to="dashboard" onClick={toggleDrawer}>{t('myTrips')}</Link>
                                </li>
                                <li className="mb-4 font-bold text-zinc-900 dark:text-zinc-100">
                                    <Link to="faq" onClick={toggleDrawer}>{t('FAQ')}</Link>
                                </li>
                            </ul>
                        </div>

                        <ul className="flex flex-col mt-auto">
                            <li className="mb-4 text-zinc-900 dark:text-zinc-100">
                                <Link to="settings" onClick={toggleDrawer}>{t('settings')}</Link>
                            </li>
                            <li>
                                <button
                                    className="text-zinc-900 dark:text-zinc-100"
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
