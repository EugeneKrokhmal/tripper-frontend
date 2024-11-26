import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import PugPic from '../../images/ad/sticker.png';
import Button from '../elements/Button';

const BugReportPopup: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const { t } = useTranslation();

    useEffect(() => {
        const popupDismissed = localStorage.getItem('popupDismissed');
        if (!popupDismissed) {
            setTimeout(() => {
                setIsVisible(true);
            }, 2000);
        }
    }, []);

    const handleHidePopup = () => {
        setIsVisible(false);
        localStorage.setItem('popupDismissed', 'true');
    };

    const handleReportBug = () => {
        window.location.href = 'mailto:support@tripper.cc?subject=Bug Report&body=Please describe the bug you encountered...';
    };

    return (
        <div
            style={{'transitionDuration': '5s'}}
            className={`z-40 fixed bottom-5 right-2 transform transition-transform ease-in-out ${isVisible ? 'translate-x-0' : 'translate-x-full'
                } flex flex-col items-end text-left`}
        >
            <img
                width="100"
                src={PugPic}
                alt="Pug Sticker"
                className={`-mb-2 -mr-2`}
            />
            <div style={{'transitionDelay': '5s'}} className={`w-64 bg-white shadow dark:bg-zinc-900 rounded p-2 transform transition-transform ease-in-out ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Psss..</h3>
                <b className="text-xs text-zinc-700 dark:text-zinc-300 mt-2">{t('testMode')}</b>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 mt-2">{t('reportBug')}</p>

                <div className="flex justify-end space-x-2 mt-4">
                    <Button
                        label={t('cancel')}
                        onClick={handleHidePopup}
                        variant="secondary"
                    />
                    <Button
                        label={t('Bug')}
                        onClick={handleReportBug}
                        variant='primary'
                    />
                </div>
            </div>
        </div>
    );
};

export default BugReportPopup;
