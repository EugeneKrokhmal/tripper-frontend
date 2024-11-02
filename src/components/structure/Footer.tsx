import React from 'react';
import logo from '../images/logo.png';

const Footer: React.FC = () => {

    return (
        <footer className="bg-gray-100 dark:bg-zinc-900 mt-auto pb-16">
            <div className="w-full shadow max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        {/* <img src={logo} className="h-8" alt="Tripper" /> */}
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white md:text-2xl">🎃 Tripper</h3>

                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-zinc-500 dark:text-zinc-300  sm:mb-0 dark:text-zinc-400">
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
                <hr className="my-6 border-zinc-200 sm:mx-auto dark:border-zinc-700 lg:my-8" />
                <span className="block text-sm text-zinc-500 dark:text-zinc-300  sm:text-center dark:text-zinc-400">© 2024 <a href="https://flowbite.com/" className="hover:underline">Tripper</a>. All Rights Reserved.</span>
            </div>
        </footer>
    );
};

export default Footer;
