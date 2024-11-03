import React from 'react';
import { useTranslation } from 'react-i18next';

const FAQ = () => {
    const { t } = useTranslation();

    return (
        <div className="faq-container px-4 py-8 mx-auto max-w-7xl">
            <h1 className="text-3xl font-bold mb-8 dark:text-zinc-300">{t('faq.title')}</h1>

            <div className="faq-section mb-12">
                <h2 className="text-2xl font-bold"><span className="text-gradient">{t('faq.generalQuestions.title')}</span></h2>
                <div>
                    <p className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-300">{t('faq.generalQuestions.q1')}</p>
                    <p className="mb-4 text-sm text-zinc-900 dark:text-zinc-300">{t('faq.generalQuestions.a1')}</p>
                </div>
                <div>
                    <p className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-300">{t('faq.generalQuestions.q2')}</p>
                    <p className="mb-4 text-sm text-zinc-900 dark:text-zinc-300">{t('faq.generalQuestions.a2')}</p>
                </div>
                <div>
                    <p className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-300">{t('faq.generalQuestions.q3')}</p>
                    <p className="mb-4 text-sm text-zinc-900 dark:text-zinc-300">{t('faq.generalQuestions.a3')}</p>
                </div>
            </div>

            <div className="faq-section mb-12">
                <h2 className="text-2xl font-bold"><span className="text-gradient">{t('faq.expensesAndSettlements.title')}</span></h2>
                <div>
                    <p className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-300">{t('faq.expensesAndSettlements.q1')}</p>
                    <p className="mb-4 text-sm text-zinc-900 dark:text-zinc-300">{t('faq.expensesAndSettlements.a1')}</p>
                </div>
                <div>
                    <p className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-300">{t('faq.expensesAndSettlements.q2')}</p>
                    <p className="mb-4 text-sm text-zinc-900 dark:text-zinc-300">{t('faq.expensesAndSettlements.a2')}</p>
                </div>
                <div>
                    <p className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-300">{t('faq.expensesAndSettlements.q3')}</p>
                    <p className="mb-4 text-sm text-zinc-900 dark:text-zinc-300">{t('faq.expensesAndSettlements.a3')}</p>
                </div>
            </div>

            <div className="faq-section mb-12">
                <h2 className="text-2xl font-bold"><span className="text-gradient">{t('faq.paymentsAndFairShare.title')}</span></h2>
                <div>
                    <p className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-300">{t('faq.paymentsAndFairShare.q1')}</p>
                    <p className="mb-4 text-sm text-zinc-900 dark:text-zinc-300">{t('faq.paymentsAndFairShare.a1')}</p>
                </div>
                <div>
                    <p className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-300">{t('faq.paymentsAndFairShare.q2')}</p>
                    <p className="mb-4 text-sm text-zinc-900 dark:text-zinc-300">{t('faq.paymentsAndFairShare.a2')}</p>
                </div>
                <div>
                    <p className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-300">{t('faq.paymentsAndFairShare.q3')}</p>
                    <p className="mb-4 text-sm text-zinc-900 dark:text-zinc-300">{t('faq.paymentsAndFairShare.a3')}</p>
                </div>
            </div>

            <div className="faq-section mb-12">
                <h2 className="text-2xl font-bold">
                    <span className="text-gradient">
                        {t('faq.accountAndPrivacy.title')}
                    </span>
                </h2>
                <div>
                    <p className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-300">{t('faq.accountAndPrivacy.q1')}</p>
                    <p className="mb-4 text-sm text-zinc-900 dark:text-zinc-300">{t('faq.accountAndPrivacy.a1')}</p>
                </div>
                <div>
                    <p className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-300">{t('faq.accountAndPrivacy.q2')}</p>
                    <p className="mb-4 text-sm text-zinc-900 dark:text-zinc-300">{t('faq.accountAndPrivacy.a2')}</p>
                </div>
                <div>
                    <p className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-300">{t('faq.accountAndPrivacy.q3')}</p>
                    <p className="mb-4 text-sm text-zinc-900 dark:text-zinc-300">{t('faq.accountAndPrivacy.a3')}</p>
                </div>
            </div>

            <div className="faq-section mb-12">
                <h2 className="text-2xl font-bold"><span className="text-gradient">{t('faq.technicalSupport.title')}</span></h2>
                <div>
                    <p className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-300">{t('faq.technicalSupport.q1')}</p>
                    <p className="mb-4 text-sm text-zinc-900 dark:text-zinc-300">{t('faq.technicalSupport.a1')}</p>
                </div>
                <div>
                    <p className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-300">{t('faq.technicalSupport.q2')}</p>
                    <p className="mb-4 text-sm text-zinc-900 dark:text-zinc-300">{t('faq.technicalSupport.a2')}</p>
                </div>
                <div>
                    <p className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-300">{t('faq.technicalSupport.q3')}</p>
                    <p className="mb-4 text-sm text-zinc-900 dark:text-zinc-300">{t('faq.technicalSupport.a3')}</p>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
