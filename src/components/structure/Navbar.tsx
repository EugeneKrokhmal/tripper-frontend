import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { logout } from '../../redux/slices/authSlice';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import BurgerMenu from './BurgerMenu';
import DarkModeToggle from './DarkModeToggle';

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
        <nav className="z-50 fixed top-0 left-0 w-full h-20 bg-white border-zinc-200 dark:bg-zinc-900 shadow">
            <div className="max-w-screen-xl h-full flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-1 rtl:space-x-reverse">
                    <div className="text-xl font-extrabold text-zinc-900 dark:text-white">
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
