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
        setIsSidebarOpen(false); // Close sidebar after navigation
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
            {/* <button
                onClick={toggleSidebar}
                className="fixed left-0 lg:hidden p-2 m-4 text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-md"
            >
                {isSidebarOpen ? t('Close Menu') : t('Open Menu')}
            </button> */}

            <div className={`fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`} onClick={toggleSidebar} />

            <aside
                className={`fixed top-0 left-0 h-full bg-white dark:bg-gray-800 z-50 transition-transform transform ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0 lg:relative lg:block lg:w-1/4 xl:w-1/5 p-4 lg:p-0`}
                aria-label="Sidebar"
            >
                <div className="w-full h-full rounded px-3 py-4 overflow-y-auto">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <button
                                onClick={() => handleScroll('theplace')}
                                className={`flex items-center w-full p-2 text-left rounded-lg ${isActive('theplace') ? 'bg-gray-100 dark:bg-gray-600' : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'} group`}
                            >
                                <img className="w-4" src={MarkerIcon} alt={t('thePlace')} />
                                <span className="ms-3">{t('thePlace')}</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleScroll('thecrew')}
                                className={`flex items-center w-full p-2 text-left rounded-lg ${isActive('thecrew') ? 'bg-gray-100 dark:bg-gray-600' : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'} group`}
                            >
                                <img className="w-4" src={TeamIcon} alt={t('theCrew')} />
                                <span className="ms-3">{t('theCrew')}</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleScroll('timeline')}
                                className={`flex items-center w-full p-2 text-left rounded-lg ${isActive('timeline') ? 'bg-gray-100 dark:bg-gray-600' : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'} group`}
                            >
                                <img className="w-4" src={TimeLineIcon} alt={t('timeline')} />
                                <span className="ms-3">{t('timeline')}</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleScroll('settlementsummary')}
                                className={`flex items-center w-full p-2 text-left rounded-lg ${isActive('settlementsummary') ? 'bg-gray-100 dark:bg-gray-600' : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'} group`}
                            >
                                <img className="w-4" src={SettlementIcon} alt={t('settlementSummary')} />
                                <span className="ms-3">{t('settlementSummary')}</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleScroll('history')}
                                className={`flex items-center w-full p-2 text-left rounded-lg ${isActive('history') ? 'bg-gray-100 dark:bg-gray-600' : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'} group`}
                            >
                                <img className="w-4" src={HistoryIcon} alt={t('history')} />
                                <span className="ms-3">{t('history')}</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
