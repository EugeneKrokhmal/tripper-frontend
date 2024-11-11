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
            <aside
                className={`hidden lg:block h-100 bg-white dark:bg-zinc-800 z-10 lg:translate-x-0 lg:relative lg:block lg:w-1/4 xl:w-1/4 p-4 lg:p-0`}
                aria-label="Sidebar"
            >
                <div className="sticky top-24 w-full rounded px-3 py-4 overflow-y-auto">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <button
                                onClick={() => handleScroll('theplace')}
                                className={`flex items-center w-full p-2 text-left rounded-lg ${isActive('theplace') ? 'bg-zinc-100 dark:bg-zinc-600' : 'text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700'} group`}
                            >
                                <img className="w-4 dark:invert" src={MarkerIcon} alt={t('thePlace')} />
                                <span className="ms-3">{t('thePlace')}</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleScroll('thecrew')}
                                className={`flex items-center w-full p-2 text-left rounded-lg ${isActive('thecrew') ? 'bg-zinc-100 dark:bg-zinc-600' : 'text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700'} group`}
                            >
                                <img className="w-4 dark:invert" src={TeamIcon} alt={t('theCrew')} />
                                <span className="ms-3">{t('theCrew')}</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleScroll('settlementsummary')}
                                className={`flex items-center w-full p-2 text-left rounded-lg ${isActive('settlementsummary') ? 'bg-zinc-100 dark:bg-zinc-600' : 'text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700'} group`}
                            >
                                <img className="w-4 dark:invert" src={SettlementIcon} alt={t('settlementSummary')} />
                                <span className="ms-3">{t('settlementSummary')}</span>
                            </button>
                        </li>                        
                        <li>
                            <button
                                onClick={() => handleScroll('timeline')}
                                className={`flex items-center w-full p-2 text-left rounded-lg ${isActive('timeline') ? 'bg-zinc-100 dark:bg-zinc-600' : 'text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700'} group`}
                            >
                                <img className="w-4 dark:invert" src={TimeLineIcon} alt={t('timeline')} />
                                <span className="ms-3">{t('timeline')}</span>
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => handleScroll('history')}
                                className={`flex items-center w-full p-2 text-left rounded-lg ${isActive('history') ? 'bg-zinc-100 dark:bg-zinc-600' : 'text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700'} group`}
                            >
                                <img className="w-4 dark:invert" src={HistoryIcon} alt={t('history')} />
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
