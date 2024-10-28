import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Price from '../Price';

interface ExpenseSummaryProps {
    totalPaidByUser: number;
    totalCost: number;
    fairShare: number;
    onFairShareUpdate: (fairShare: number, settlements: any[]) => void;
    tripId: string;
    remainingOwedToUser: number; // Add this prop to show how much is owed
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ totalPaidByUser, totalCost, remainingOwedToUser }) => {
    const chartRef = useRef<HTMLDivElement | null>(null);
    const chartInstance = useRef<any>(null);
    const { t } = useTranslation();
    const debtToUser = totalPaidByUser - totalCost;

    useEffect(() => {
        const createChart = () => {
            const options = {
                series: [totalPaidByUser, totalCost, totalPaidByUser - totalCost],
                colors: ["#1C64F2", "#16BDCA", "#9061F9"],
                chart: {
                    height: 300,
                    type: "donut",
                },
                labels: [t("youPaid"), t("itCostsYou"), t("settlementSummary")],
                dataLabels: {
                    enabled: true,
                    style: {
                        fontFamily: "Inter, sans-serif",
                    },
                },
                legend: {
                    position: "right",
                    fontFamily: "Inter, sans-serif",
                },
            };

            if (chartRef.current && !(chartInstance.current)) {
                chartInstance.current = new (window as any).ApexCharts(chartRef.current, options);
                chartInstance.current.render();
            }
        };

        if ((window as any).ApexCharts) {
            createChart();
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, [totalPaidByUser, totalCost]);

    if (totalCost <= 0) {
        return '';
    }

    return (
        <div className="mb-6 md:max-w-sm w-full bg-white dark:bg-gray-800">
            <h3 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{t('expensesOverview')}</span>
            </h3>
            <div className="mb-2 bg-gray-100 dark:bg-gray-600 rounded p-2">
                <h5 className="text-4xl font-bold text-gray-900 dark:text-white">
                    <Price price={+totalPaidByUser.toFixed()} />
                </h5>
                <p className="text-xs font-normal text-gray-500 dark:text-gray-300">{t('youPaid')}</p>
            </div>
            <div className="flex gap-2 items-normal mb-4">
                <div className="bg-gray-100 dark:bg-gray-600 rounded p-2">
                    <h5 className="text-l font-bold text-gray-900 dark:text-white">
                        <Price price={+totalCost.toFixed()} />
                    </h5>
                    <p className="text-xs font-normal text-gray-500 dark:text-gray-300 ">{t('itCostsYou')}</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-600 rounded p-2">
                    <h5 className="text-l font-bold text-gray-900 dark:text-white">
                        <Price price={+debtToUser.toFixed()} />
                    </h5>
                    <p className="text-xs font-normal text-gray-500 dark:text-gray-300 ">{t('settlementSummary')}</p>
                </div>
                {/* New div for remaining owed to you */}
                {/* <div className="bg-gray-100 dark:bg-gray-600 rounded p-2">
                    <h5 className="text-l font-bold text-gray-900 dark:text-white">
                        <Price price={+remainingOwedToUser.toFixed()} />
                    </h5>
                    <p className="text-xs font-normal text-gray-500 dark:text-gray-300 ">{t('remainingOwedToYou')}</p>
                </div> */}
            </div>
            {/* Donut Chart */}
            <div className="pe-6" id="donut-chart" ref={chartRef}></div>
        </div>
    );
};

export default ExpenseSummary;
