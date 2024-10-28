import React from 'react';
import logo from '../images/logo.png';

const Footer: React.FC = () => {

    return (
        <footer className="bg-gray-100 dark:bg-gray-900 mt-auto">
            <div className="w-full shadow max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        {/* <img src={logo} className="h-8" alt="Tripper" /> */}
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white md:text-2xl">🎃 Tripper</h3>

                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 dark:text-gray-300  sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">About</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 dark:text-gray-300  sm:text-center dark:text-gray-400">© 2024 <a href="https://flowbite.com/" className="hover:underline">Tripper</a>. All Rights Reserved.</span>
            </div>
        </footer>
    );
};

export default Footer;
