import React from 'react';
import { useTranslation } from 'react-i18next';

const FAQ = () => {
    const { t } = useTranslation();

    return (
        <div className="faq-container px-4 py-8 mx-auto max-w-7xl">
            <h1 className="text-3xl font-bold mb-8">{t('faq.title')}</h1>

            <div className="faq-section mb-12">
                <h2 className="mb-2 text-4xl font-extrabold text-zinc-900 md:text-3xl md:mt-4 text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 dark:bg-gradient-to-r dark:from-purple-500 dark:to-pink-500">{t('faq.generalQuestions.title')}</h2>
                <div>
                    <p className="font-semibold">{t('faq.generalQuestions.q1')}</p>
                    <p className="mb-4">{t('faq.generalQuestions.a1')}</p>
                </div>
                <div>
                    <p className="font-semibold">{t('faq.generalQuestions.q2')}</p>
                    <p className="mb-4">{t('faq.generalQuestions.a2')}</p>
                </div>
                <div>
                    <p className="font-semibold">{t('faq.generalQuestions.q3')}</p>
                    <p className="mb-4">{t('faq.generalQuestions.a3')}</p>
                </div>
            </div>

            <div className="faq-section mb-12">
                <h2 className="mb-2 text-4xl font-extrabold text-zinc-900 md:text-3xl md:mt-4 text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 dark:bg-gradient-to-r dark:from-purple-500 dark:to-pink-500">{t('faq.expensesAndSettlements.title')}</h2>
                <div>
                    <p className="font-semibold">{t('faq.expensesAndSettlements.q1')}</p>
                    <p className="mb-4">{t('faq.expensesAndSettlements.a1')}</p>
                </div>
                <div>
                    <p className="font-semibold">{t('faq.expensesAndSettlements.q2')}</p>
                    <p className="mb-4">{t('faq.expensesAndSettlements.a2')}</p>
                </div>
                <div>
                    <p className="font-semibold">{t('faq.expensesAndSettlements.q3')}</p>
                    <p className="mb-4">{t('faq.expensesAndSettlements.a3')}</p>
                </div>
            </div>

            <div className="faq-section mb-12">
                <h2 className="mb-2 text-4xl font-extrabold text-zinc-900 md:text-3xl md:mt-4 text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 dark:bg-gradient-to-r dark:from-purple-500 dark:to-pink-500">{t('faq.paymentsAndFairShare.title')}</h2>
                <div>
                    <p className="font-semibold">{t('faq.paymentsAndFairShare.q1')}</p>
                    <p className="mb-4">{t('faq.paymentsAndFairShare.a1')}</p>
                </div>
                <div>
                    <p className="font-semibold">{t('faq.paymentsAndFairShare.q2')}</p>
                    <p className="mb-4">{t('faq.paymentsAndFairShare.a2')}</p>
                </div>
                <div>
                    <p className="font-semibold">{t('faq.paymentsAndFairShare.q3')}</p>
                    <p className="mb-4">{t('faq.paymentsAndFairShare.a3')}</p>
                </div>
            </div>

            <div className="faq-section mb-12">
                <h2 className="mb-2 text-4xl font-extrabold text-zinc-900 md:text-3xl md:mt-4 text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 dark:bg-gradient-to-r dark:from-purple-500 dark:to-pink-500">{t('faq.accountAndPrivacy.title')}</h2>
                <div>
                    <p className="font-semibold">{t('faq.accountAndPrivacy.q1')}</p>
                    <p className="mb-4">{t('faq.accountAndPrivacy.a1')}</p>
                </div>
                <div>
                    <p className="font-semibold">{t('faq.accountAndPrivacy.q2')}</p>
                    <p className="mb-4">{t('faq.accountAndPrivacy.a2')}</p>
                </div>
                <div>
                    <p className="font-semibold">{t('faq.accountAndPrivacy.q3')}</p>
                    <p className="mb-4">{t('faq.accountAndPrivacy.a3')}</p>
                </div>
            </div>

            <div className="faq-section mb-12">
                <h2 className="mb-2 text-4xl font-extrabold text-zinc-900 md:text-3xl md:mt-4 text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 dark:bg-gradient-to-r dark:from-purple-500 dark:to-pink-500">{t('faq.technicalSupport.title')}</h2>
                <div>
                    <p className="font-semibold">{t('faq.technicalSupport.q1')}</p>
                    <p className="mb-4">{t('faq.technicalSupport.a1')}</p>
                </div>
                <div>
                    <p className="font-semibold">{t('faq.technicalSupport.q2')}</p>
                    <p className="mb-4">{t('faq.technicalSupport.a2')}</p>
                </div>
                <div>
                    <p className="font-semibold">{t('faq.technicalSupport.q3')}</p>
                    <p className="mb-4">{t('faq.technicalSupport.a3')}</p>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
