import React, { useEffect, useRef } from "react";
import { Chart, ChartConfiguration } from "chart.js/auto";

interface IncomeExpenseDistributionProps {
  expenses: { type: string; category: string; amount: number }[];
  categories: { name: string }[];
}

const IncomeExpenseDistributionComponent: React.FC<IncomeExpenseDistributionProps> = ({
  expenses,
  categories,
}) => {
  const incomeChartRef = useRef<HTMLCanvasElement | null>(null);
  const expenseChartRef = useRef<HTMLCanvasElement | null>(null);
  const incomeChartInstanceRef = useRef<Chart | null>(null);
  const expenseChartInstanceRef = useRef<Chart | null>(null);

  const totalIncome = expenses
    .filter((expense) => expense.type === "income")
    .reduce((total, expense) => total + expense.amount, 0);

  const totalExpense = expenses
    .filter((expense) => expense.type === "expense")
    .reduce((total, expense) => total + expense.amount, 0);

  const balance = totalIncome - totalExpense;

  useEffect(() => {
    if (incomeChartInstanceRef.current) incomeChartInstanceRef.current.destroy();
    if (expenseChartInstanceRef.current) expenseChartInstanceRef.current.destroy();

    const incomeCtx = incomeChartRef.current?.getContext("2d");
    const expenseCtx = expenseChartRef.current?.getContext("2d");

    const labels = categories.map((category) => category.name);

    const incomeData = labels.map((label) =>
      expenses
        .filter((expense) => expense.type === "income" && expense.category === label)
        .reduce((total, expense) => total + expense.amount, 0)
    );

    const expenseData = labels.map((label) =>
      expenses
        .filter((expense) => expense.type === "expense" && expense.category === label)
        .reduce((total, expense) => total + expense.amount, 0)
    );

    if (incomeCtx) {
      const incomeConfig: ChartConfiguration<"pie", number[], string> = {
        type: "pie",
        data: {
          labels,
          datasets: [
            {
              data: incomeData,
              backgroundColor: [
                "#36A2EB",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
                "#FF6384",
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      };
      incomeChartInstanceRef.current = new Chart(incomeCtx, incomeConfig);
    }

    if (expenseCtx) {
      const expenseConfig: ChartConfiguration<"pie", number[], string> = {
        type: "pie",
        data: {
          labels,
          datasets: [
            {
              data: expenseData,
              backgroundColor: [
                "#FF6384",
                "#FF9F40",
                "#9966FF",
                "#4BC0C0",
                "#36A2EB",
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      };
      expenseChartInstanceRef.current = new Chart(expenseCtx, expenseConfig);
    }

    return () => {
      if (incomeChartInstanceRef.current) incomeChartInstanceRef.current.destroy();
      if (expenseChartInstanceRef.current) expenseChartInstanceRef.current.destroy();
    };
  }, [categories, expenses]);

  return (
    <div className="mt-6">
      {/* Özet Alanı */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between mb-6">
        <div className="text-center">
          <h3 className="text-lg font-bold">Toplam Gelir</h3>
          <p className="text-green-500 text-xl font-semibold">
            ₺{totalIncome.toLocaleString()}
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-bold">Toplam Gider</h3>
          <p className="text-red-500 text-xl font-semibold">
            ₺{totalExpense.toLocaleString()}
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-bold">Bakiye</h3>
          <p className="text-blue-500 text-xl font-semibold">
            ₺{balance.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Grafikler */}
      <div className="grid grid-cols-2 gap-6">
        <div className="w-48 h-48 mx-auto">
          <h2 className="text-md font-semibold text-center">Gelir Dağılımı</h2>
          <canvas ref={incomeChartRef} className="w-full h-full"></canvas>
        </div>
        <div className="w-48 h-48 mx-auto">
          <h2 className="text-md font-semibold text-center">Gider Dağılımı</h2>
          <canvas ref={expenseChartRef} className="w-full h-full"></canvas>
        </div>
      </div>
    </div>
  );
};

export default IncomeExpenseDistributionComponent;
