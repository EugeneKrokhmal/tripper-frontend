import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Forest from '../images/icons/forest.svg';

const LogoPage = () => {
    const { t } = useTranslation();

    return (
        <div className="flex h-full flex-col items-center justify-center gap-8">

            <div className="relative h-full w-full bg-gradient grid items-end overflow-hidden">
                <div className="dynamic-liquid-bg">
                    <div className="w-full h-full text-5xl font-extrabold text-zinc-900 dark:text-white flex justify-center items-center">
                        <span
                            className={`transition-all duration-300`}
                        >
                            {t('Tripper')}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogoPage;
