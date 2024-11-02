import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface BreadcrumbsProps {
    breadcrumbs: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
    return (
        <div className="w-full max-w-screen-xl mx-auto px-4">
            <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    {breadcrumbs.map((breadcrumb, index) => (
                        <li key={index} className="inline-flex items-center">
                            {index === 0 ? (
                                <a href={breadcrumb.href} className="inline-flex items-center text-sm font-medium text-zinc-700 hover:text-zinc-600 dark:text-zinc-300  dark:text-zinc-400 dark:hover:text-white">
                                    {breadcrumb.label}
                                </a>
                            ) : (
                                <div className="flex items-center">
                                    <svg className="rtl:rotate-180 w-3 h-3 text-zinc-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                    {index === breadcrumbs.length - 1 ? (
                                        <span className="ms-1 text-sm font-medium text-zinc-500 dark:text-zinc-300  md:ms-2 dark:text-zinc-400">
                                            {breadcrumb.label}
                                        </span>
                                    ) : (
                                        <Link to={breadcrumb.href} className="ms-1 text-sm font-medium text-zinc-700 hover:text-zinc-600 dark:text-zinc-300  md:ms-2 dark:text-zinc-400 dark:hover:text-white">
                                            {breadcrumb.label}
                                        </Link>
                                    )}
                                </div>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    );
};

export default Breadcrumbs;
