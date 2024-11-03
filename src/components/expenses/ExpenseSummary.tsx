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
        <div className="mb-6 md:max-w-sm w-full bg-white dark:bg-zinc-800">
            <h3 className="mb-4 text-2xl font-extrabold text-zinc-900 dark:text-white">
                <span className="text-gradient">{t('expensesOverview')}</span>
            </h3>
            <div className="mb-2 bg-zinc-100 dark:bg-zinc-600 rounded p-2">
                <h5 className="text-4xl font-bold text-zinc-900 dark:text-white">
                    <Price price={+totalPaidByUser.toFixed()} />
                </h5>
                <p className="text-xs font-normal text-zinc-500 dark:text-zinc-300">{t('youPaid')}</p>
            </div>
            <div className="flex gap-2 items-normal mb-4">
                <div className="bg-zinc-100 dark:bg-zinc-600 rounded p-2">
                    <h5 className="text-l font-bold text-zinc-900 dark:text-white">
                        <Price price={+totalCost.toFixed(2)} />
                    </h5>
                    <p className="text-xs font-normal text-zinc-500 dark:text-zinc-300 ">{t('itCostsYou')}</p>
                </div>
                <div className="bg-zinc-100 dark:bg-zinc-600 rounded p-2">
                    <h5 className="text-l font-bold text-zinc-900 dark:text-white">
                        <Price price={+debtToUser.toFixed(2)} />
                    </h5>
                    <p className="text-xs font-normal text-zinc-500 dark:text-zinc-300 ">{t('settlementSummary')}</p>
                </div>
                {/* New div for remaining owed to you */}
                {/* <div className="bg-zinc-100 dark:bg-zinc-600 rounded p-2">
                    <h5 className="text-l font-bold text-zinc-900 dark:text-white">
                        <Price price={+remainingOwedToUser.toFixed()} />
                    </h5>
                    <p className="text-xs font-normal text-zinc-500 dark:text-zinc-300 ">{t('remainingOwedToYou')}</p>
                </div> */}
            </div>
            {/* Donut Chart */}
            <div className="pe-6" id="donut-chart" ref={chartRef}></div>
        </div>
    );
};

export default ExpenseSummary;
