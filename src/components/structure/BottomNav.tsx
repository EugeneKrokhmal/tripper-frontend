import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { Link } from 'react-router-dom';

const BottomNav: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
        return '';
    }

    return (
        <div className="md:hidden fixed bottom-0 z-40 w-full -translate-x-1/2 bg-white border-t border-zinc-200 left-1/2 dark:bg-zinc-900 dark:border-zinc-600 pb-4">
            <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
                <Link to={'/'} className="inline-flex flex-col items-center justify-center p-4 group">
                    <svg className="w-5 h-5 mb-1 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                    </svg>
                    <span className="sr-only">Home</span>
                </Link>
                <Link to={'/dashboard'} className="inline-flex flex-col items-center justify-center p-4 group">
                    <svg className="w-5 h-5 mb-1 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    <span className="sr-only">Search</span>
                </Link>
                <Link to={'/new-trip'} className="inline-flex flex-col items-center justify-center p-4 group">
                    <svg className="w-5 h-5 mb-1 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                    </svg>
                    <span className="sr-only">New Trip</span>
                </Link>
                <Link to={'/settings'}className="inline-flex flex-col items-center justify-center p-4 group">
                    <svg className="w-5 h-5 mb-1 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2" />
                    </svg>
                    <span className="sr-only">Settings</span>
                </Link>
            </div>
        </div>
    );
};

export default BottomNav;
