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
                        <span className="">
                            {/* Render logo based on `logo` state */}
                            <svg style={{'aspectRatio': '16/13'}} className="bg-gradient text-white dark:text-zinc-900 w-6 object-cover" version="1.0" xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 1280 1040">
                                <path d="M0 520v520h1280V0H0v520zM683.5 8.5c15.6 1.8 23.1 2.8 34.9 4.9 9.5 1.8 32.5 7.1 36.6 8.5 1.4.5 5.9 1.9 10 3.1 9.9 2.9 24.7 8.1 34 11.8 16.4 6.6 42 19 42 20.4 0 1-6.8 12.1-26.5 43.3-7 11-19.8 31.5-28.5 45.5-8.6 14-19.5 31.6-24.2 39-4.7 7.4-11.6 18.4-15.3 24.5-3.7 6-12.1 19.3-18.5 29.5-6.5 10.2-13.1 20.7-14.7 23.5-2.8 4.7-10 16.2-31.9 51.2-4.9 7.8-15.2 24.4-22.8 36.7-7.7 12.4-15 23.8-16.2 25.3-2 2.5-2.4 2.6-3.7 1.3-.8-.8-18.1-28.7-38.4-62-20.3-33.3-46.9-76.7-59-96.5-75.9-123.9-98.2-160.6-98.5-162.1-.4-2 2.1-3.5 18.5-11 50.4-23.1 100-35.3 158.2-38.8 11.7-.7 51.2.5 64 1.9zM424.9 132.9c47.8 78.1 100 163.4 146.9 240.1 25 41 46.9 76 48.6 77.8 5.7 6.2 4.3 5.8 75.1 22.7 15.4 3.7 37.9 9.1 50 12 52.8 12.8 73.7 17.8 99.5 24 15.1 3.6 39.7 9.5 54.5 13.1 37.5 9.1 81.8 19.7 129 31 8.3 2 15.5 4.2 16.1 5 1 1.2 1.3 1.2 1.8.2.9-2.3-.6 4.6-1.7 7.2-.6 1.4-1.2 3.3-1.4 4.3-.3 1.8-2.9 8.5-5.9 15.5-.8 1.8-1.4 3.7-1.4 4.2s-1.1 3.3-2.4 6.2c-1.3 2.9-4.5 10-7.1 15.8-7.2 15.9-28.5 53.9-31.4 56-.4.3-1 1.2-1.3 2-.6 1.4-17.6 24.8-20.4 28-.7.8-4.3 5.1-8.1 9.5-11.4 13.5-12.6 14.7-171 173.5L640 1035.5l-150-150C342 737.6 322 717.1 307.5 699c-21.6-27.1-41-58.3-54.5-88-16.7-36.4-27.7-73-33.9-112-.5-3.6-1.3-8.2-1.6-10.3-1.8-11.1-3.5-38.6-3.5-55.9-.1-134.1 62.2-259.7 168.5-340l11.9-9.1L396 86c.8 1.2 13.8 22.3 28.9 46.9zm473.3-39.7c22.9 17.5 50.3 43.6 66.3 62.9 1.1 1.3 4.3 5.3 7.2 8.8 2.9 3.5 5.3 6.6 5.3 7 0 .3 1.8 2.6 4 5.1 2.2 2.5 4 4.8 4 5.2 0 .4.6 1.3 1.3 2 2 2.1 20.1 29.7 23.5 35.8 14.4 26.1 25.4 50.7 33.6 75 4.6 13.9 6.1 18.9 10.1 34.5 3.5 14 6.9 31.4 8 40.5.3 3 .8 6.2 1 7 .2.8.7 4.6 1 8.5.3 3.8 1 11.5 1.5 17 1.9 20 .4 70-2.5 84.5-.3 1.4-.7 4.5-1 7-.7 5.8-2.3 12.1-2.4 9.5-.1-1.5-.4-1.6-1-.7-.4.8-1.8 1.1-3.2.8-4.5-1-57.4-13.7-81.4-19.5-13.2-3.2-34.8-8.4-48-11.6-35.2-8.4-56.3-13.5-91-21.9-17-4.1-42.5-10.2-56.5-13.6-14-3.3-36.5-8.7-50-11.9-13.5-3.3-27.9-6.7-32-7.7-8.2-1.8-11-3-11-4.4 0-1 25-42 34.4-56.5 2.9-4.4 6.6-10.3 8.3-13 9.5-15.6 27.6-44.6 34.3-55 4.2-6.6 9.7-15.4 12.2-19.5 4.8-8 18.6-30.2 33.6-54 5-8 10.5-16.8 12.2-19.5 3.1-5.1 15.7-25.4 33.6-54 5.6-8.8 15.6-24.9 22.3-35.8 6.8-10.8 12.4-19.7 12.6-19.7.1 0 4.5 3.3 9.7 7.2z" fill="currentColor" />
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
