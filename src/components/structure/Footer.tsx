import React from 'react';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {

    return (
        <footer className="bg-zinc-100 dark:bg-zinc-900 mt-auto pb-20 md:pb-0 hidden md:block">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-2">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        {/* <img src={logo} className="h-8" alt="Tripper" /> */}
                        <h3 className="font-bold text-zinc-900 dark:text-white md:text-xl">Tripper</h3>

                    </a>
                    <ul className="flex flex-wrap items-center mb-1 text-xs font-medium text-zinc-500 dark:text-zinc-300  sm:mb-0 dark:text-zinc-400">
                        <li>
                            <Link to={'blog'} className="hover:underline me-4 md:me-6">Blog</Link>
                        </li>
                        <li>
                            <Link to={'faq'} className="hover:underline me-4 md:me-6">FAQ</Link>
                        </li>
                        <li>
                            <a href="mailto:info@tripper.cc#" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
