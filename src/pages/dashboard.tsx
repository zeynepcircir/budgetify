import { useState, useEffect, useRef } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import ExpenseForm from "../components/ExpenseForm";
import Chart from "chart.js/auto";

const Dashboard = () => {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>(""); 
  const [editingExpense, setEditingExpense] = useState<any>(null); 
  const [budgetLimits, setBudgetLimits] = useState<{ [key: string]: number }>({});

  const pieChartRef = useRef<Chart | null>(null); 


  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, []);

 
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);


  const totalIncome = expenses
    .filter((item) => item.type === "income")
    .reduce((total, item) => total + item.amount, 0);

  const totalExpense = expenses
    .filter((item) => item.type === "expense")
    .reduce((total, item) => total + item.amount, 0);

  const netBalance = totalIncome - totalExpense;

 
  useEffect(() => {
    expenses.forEach((expense) => {
      if (expense.type === "expense") {
        const totalSpent = expenses
          .filter((e) => e.category === expense.category && e.type === "expense")
          .reduce((sum, e) => sum + e.amount, 0);

        if (
          budgetLimits[expense.category] &&
          totalSpent >= budgetLimits[expense.category] * 0.8
        ) {
          alert(
            `Uyarı: ${expense.category} kategorisindeki harcamalar bütçe limitinin %80'ine ulaştı!`
          );
        }
      }
    });
  }, [expenses, budgetLimits]);

  
  const renderCharts = () => {
    const ctx = document.getElementById("pieChart") as HTMLCanvasElement;

    if (pieChartRef.current) {
      pieChartRef.current.destroy(); 
    }

    const categories = Array.from(new Set(expenses.map((e) => e.category)));
    const data = categories.map((category) =>
      expenses
        .filter((e) => e.category === category && e.type === "expense")
        .reduce((sum, e) => sum + e.amount, 0)
    );
    //@ts-ignore
    pieChartRef.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: categories,
        datasets: [
          {
            data,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, 
      },
    });
  };

  useEffect(() => {
    renderCharts();


    return () => {
      if (pieChartRef.current) {
        pieChartRef.current.destroy();
      }
    };
  }, [expenses]);


  const addExpense = (expense: any) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

 
  const editExpense = (id: number, updatedExpense: any) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === id ? { ...expense, ...updatedExpense } : expense
      )
    );
  };

 
  const deleteExpense = (id: number) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 text-gray-800">

      <h1 className="text-3xl font-bold mb-6">Bütçe Yönetim Paneli</h1>


      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-green-100 rounded">
          <h2 className="text-lg font-bold">Toplam Gelir</h2>
          <p className="text-2xl">{totalIncome} TL</p>
        </div>
        <div className="p-4 bg-red-100 rounded">
          <h2 className="text-lg font-bold">Toplam Gider</h2>
          <p className="text-2xl">{totalExpense} TL</p>
        </div>
        <div className="p-4 bg-blue-100 rounded">
          <h2 className="text-lg font-bold">Net Bakiye</h2>
          <p className="text-2xl">{netBalance} TL</p>
        </div>
      </div>


      <ExpenseForm
        onClose={() => setEditingExpense(null)}
        editingExpense={editingExpense}
        addExpense={addExpense}
        editExpense={editExpense}
      />


      <div className="mb-6">
        <label className="block mb-2">Kategoriye Göre Filtrele</label>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded w-full"
        >
          <option value="">Tümü</option>
          {Array.from(new Set(expenses.map((e) => e.category))).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>


      <ul className="space-y-4">
        {expenses
          .filter(
            (e) => !filterCategory || e.category === filterCategory 
          )
          .map((expense) => (
            <li
              key={expense.id}
              className="p-4 bg-gray-100 rounded flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{expense.description}</p>
                <p>{expense.amount} TL</p>
                <p>{expense.date}</p>
                <p>Kategori: {expense.category}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingExpense(expense)} 
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => deleteExpense(expense.id)} 
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Sil
                </button>
              </div>
            </li>
          ))}
      </ul>


      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">Raporlama</h2>
        <div style={{ width: "400px", height: "400px", margin: "0 auto" }}>
          <canvas id="pieChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
