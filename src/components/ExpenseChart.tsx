import React, { useEffect, useRef } from "react";
import Chart, { ChartConfiguration } from "chart.js/auto";

type ExpenseChartProps = {
  expenses: { type: string; category: string; amount: number }[];
};

const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses }) => {
  const incomeChartRef = useRef<HTMLCanvasElement | null>(null);
  const expenseChartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!expenses || expenses.length === 0) return;

    const incomeData = expenses
      .filter((e) => e.type === "income")
      .reduce((acc: { [key: string]: number }, e) => {
        acc[e.category] = (acc[e.category] || 0) + e.amount;
        return acc;
      }, {});

    const expenseData = expenses
      .filter((e) => e.type === "expense")
      .reduce((acc: { [key: string]: number }, e) => {
        acc[e.category] = (acc[e.category] || 0) + e.amount;
        return acc;
      }, {});

    if (incomeChartRef.current) {
      const incomeChartConfig: ChartConfiguration<"pie", number[], string> = {
        type: "pie",
        data: {
          labels: Object.keys(incomeData),
          datasets: [
            {
              data: Object.values(incomeData),
              backgroundColor: ["#36A2EB", "#4BC0C0", "#FFCE56", "#FF6384"],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
        },
      };
      new Chart(incomeChartRef.current, incomeChartConfig);
    }

    if (expenseChartRef.current) {
      const expenseChartConfig: ChartConfiguration<"pie", number[], string> = {
        type: "pie",
        data: {
          labels: Object.keys(expenseData),
          datasets: [
            {
              data: Object.values(expenseData),
              backgroundColor: ["#FF6384", "#FFCE56", "#4BC0C0", "#36A2EB"],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
        },
      };
      new Chart(expenseChartRef.current, expenseChartConfig);
    }
  }, [expenses]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3 className="text-center text-lg font-semibold mb-2">Gelir Dağılımı</h3>
        <canvas ref={incomeChartRef}></canvas>
      </div>
      <div>
        <h3 className="text-center text-lg font-semibold mb-2">Gider Dağılımı</h3>
        <canvas ref={expenseChartRef}></canvas>
      </div>
    </div>
  );
};

export default ExpenseChart;
