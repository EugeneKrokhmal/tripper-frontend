import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import MarkerIcon from '../../images/icons/marker.svg';
import TeamIcon from '../../images/icons/team.svg';
import TimeLineIcon from '../../images/icons/timeline.svg';
import SettlementIcon from '../../images/icons/money.svg';
import HistoryIcon from '../../images/icons/history.svg';

const Sidebar: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string>('');
    const { t } = useTranslation();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleScroll = (elementId: string) => {
        const element = document.getElementById(elementId);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        const sections = ['theplace', 'thecrew', 'timeline', 'settlementsummary', 'history'];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-100px 0px 0px 0px',
                threshold: 0.3,
            }
        );

        sections.forEach((section) => {
            const sectionElement = document.getElementById(section);
            if (sectionElement) {
                observer.observe(sectionElement);
            }
        });

        return () => {
            sections.forEach((section) => {
                const sectionElement = document.getElementById(section);
                if (sectionElement) {
                    observer.unobserve(sectionElement);
                }
            });
        };
    }, []);

    const isActive = (section: string) => activeSection === section;

    return (
        <>
            <div className="hidden lg:flex flex-col gap-8 md:w-1/2 w-full lg:mt-0 lg:w-1/4 xl:w-2/5">
                <div className="lg:sticky top-24 flex flex-col gap-8">
                    {/* Sidebar for larger screens */}
                    <aside
                        id="default-sidebar"
                        className={`top-0 left-0 z-40 flex transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                            } sm:translate-x-0 lg:block hidden`}
                        aria-label="Sidebar"
                    >
                        <div className="w-full rounded px-3 py-4 overflow-y-auto">
                            <ul className="top-0 space-y-2 font-medium">
                                <li>
                                    <button
                                        onClick={() => handleScroll('theplace')}
                                        className={`flex items-center w-full p-2 text-left rounded-lg ${isActive('theplace') ? 'bg-gray-100 dark:bg-gray-600' : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                            } group`}
                                    >
                                        <img className="w-4" src={MarkerIcon} alt={t('thePlace')} />
                                        <span className="ms-3">{t('thePlace')}</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleScroll('thecrew')}
                                        className={`flex items-center w-full p-2 text-left rounded-lg ${isActive('thecrew') ? 'bg-gray-100 dark:bg-gray-600' : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                            } group`}
                                    >
                                        <img className="w-4" src={TeamIcon} alt={t('theCrew')} />
                                        <span className="flex-1 ms-3 whitespace-nowrap">{t('theCrew')}</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleScroll('timeline')}
                                        className={`flex items-center w-full p-2 text-left rounded-lg ${isActive('timeline') ? 'bg-gray-100 dark:bg-gray-600' : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                            } group`}
                                    >
                                        <img className="w-4" src={TimeLineIcon} alt={t('timeline')} />
                                        <span className="flex-1 ms-3 whitespace-nowrap">{t('timeline')}</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleScroll('settlementsummary')}
                                        className={`flex items-center w-full p-2 text-left rounded-lg ${isActive('settlementsummary') ? 'bg-gray-100 dark:bg-gray-600' : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                            } group`}
                                    >
                                        <img className="w-4" src={SettlementIcon} alt={t('settlementSummary')} />
                                        <span className="flex-1 ms-3 whitespace-nowrap">{t('settlementSummary')}</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleScroll('history')}
                                        className={`flex items-center w-full p-2 text-left rounded-lg ${isActive('history') ? 'bg-gray-100 dark:bg-gray-600' : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                            } group`}
                                    >
                                        <img className="w-4" src={HistoryIcon} alt={t('history')} />
                                        <span className="flex-1 ms-3 whitespace-nowrap">{t('history')}</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
            {/* Bottom navigation for mobile */}

            <div className="z-40 rounded-full backdrop-blur-sm fixed z-50 h-16 border border-gray-200  bottom-4 left-32 right-4 dark:border-gray-600 lg:hidden">
                <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
                    <button
                        onClick={() => handleScroll('theplace')}
                        type="button"
                        className={`inline-flex flex-col items-center justify-center px-5 rounded-s-full ${isActive('theplace') ? 'text-blue-600' : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-gray-500'
                            }`}
                    >
                        <img src={MarkerIcon} alt={t('thePlace')} />
                    </button>

                    <button
                        onClick={() => handleScroll('thecrew')}
                        type="button"
                        className={`inline-flex flex-col items-center justify-center px-5 ${isActive('thecrew') ? 'text-blue-600' : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-gray-500'
                            }`}
                    >
                        <img src={TeamIcon} alt={t('theCrew')} />
                    </button>

                    <button
                        onClick={() => handleScroll('settlementsummary')}
                        type="button"
                        className={`inline-flex flex-col items-center justify-center px-5 ${isActive('settlementsummary') ? 'text-blue-600' : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-gray-500'
                            }`}
                    >
                        <img src={SettlementIcon} alt={t('settlementSummary')} />
                    </button>

                    <button
                        onClick={() => handleScroll('history')}
                        type="button"
                        className={`inline-flex flex-col items-center justify-center px-5 rounded-e-full ${isActive('history') ? 'text-blue-600' : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-gray-500'
                            }`}
                    >
                        <img src={HistoryIcon} alt={t('history')} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
