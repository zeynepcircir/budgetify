import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import jsPDF from "jspdf";

const Dashboard = () => {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [categories, setCategories] = useState<{ name: string; limit: number }[]>([]);
  const [editingExpense, setEditingExpense] = useState<any>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [newExpense, setNewExpense] = useState<any>({ description: "", amount: 0, type: "income", category: "", date: "" });
  const [newCategory, setNewCategory] = useState<{ name: string; limit: number }>({ name: "", limit: 0 });
  const pieChartRef = useRef<Chart | null>(null);
  const barChartRef = useRef<Chart | null>(null);


  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    const storedCategories = localStorage.getItem("categories");
    const storedDarkMode = localStorage.getItem("isDarkMode");

    if (storedExpenses) setExpenses(JSON.parse(storedExpenses));
    if (storedCategories) setCategories(JSON.parse(storedCategories));
    if (storedDarkMode) setIsDarkMode(JSON.parse(storedDarkMode));
  }, []);


  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("categories", JSON.stringify(categories));
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [expenses, categories, isDarkMode]);

  const totalIncome = expenses
    .filter((item) => item.type === "income")
    .reduce((total, item) => total + item.amount, 0);

  const totalExpense = expenses
    .filter((item) => item.type === "expense")
    .reduce((total, item) => total + item.amount, 0);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const renderPieChart = () => {
    const ctx = document.getElementById("pieChart") as HTMLCanvasElement;

    if (pieChartRef.current) pieChartRef.current.destroy();

    const types = ["Gelir", "Gider"];
    const data = [totalIncome, totalExpense];
    //@ts-ignore
    pieChartRef.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: types,
        datasets: [
          {
            data,
            backgroundColor: ["#36A2EB", "#FF6384"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  };

  const renderBarChart = () => {
    const ctx = document.getElementById("barChart") as HTMLCanvasElement;

    if (barChartRef.current) barChartRef.current.destroy();

    const labels = categories.map((c) => c.name);
    const data = labels.map((category) =>
      expenses
        .filter((e) => e.category === category && e.type === "expense")
        .reduce((sum, e) => sum + e.amount, 0)
    );
    const limits = categories.map((c) => c.limit);

    barChartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Kategori Harcamaları",
            data,
            backgroundColor: "#36A2EB",
          },
          {
            label: "Bütçe Limitleri",
            data: limits,
            backgroundColor: "#FF6384",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });


    labels.forEach((label, index) => {
      const limit = limits[index];
      const total = data[index];
      if (limit && total >= limit * 0.8) {
        alert(
          `Uyarı: "${label}" kategorisindeki harcamalar bütçe limitinin %80'ine ulaştı!`
        );
      }
    });
  };

  useEffect(() => {
    renderPieChart();
    renderBarChart();
    return () => {
      if (pieChartRef.current) pieChartRef.current.destroy();
      if (barChartRef.current) barChartRef.current.destroy();
    };
  }, [expenses, categories]);

  const addExpense = () => {
    if (editingExpense) {

      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === editingExpense.id ? { ...editingExpense, ...newExpense } : expense
        )
      );
      setEditingExpense(null); 
    } else {
      setExpenses((prevExpenses) => [...prevExpenses, { ...newExpense, id: Date.now() }]);
    }
    setNewExpense({ description: "", amount: 0, type: "income", category: "", date: "" });
  };

  const startEditing = (expense: any) => {
    setEditingExpense(expense); 
    setNewExpense(expense); 
  };

  const deleteExpense = (id: number) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  };

  const addCategory = () => {
    if (!categories.find((c) => c.name === newCategory.name)) {
      setCategories([...categories, { ...newCategory }]);
      setNewCategory({ name: "", limit: 0 });
    } else {
      alert(`"${newCategory.name}" adlı bir kategori zaten mevcut!`);
    }
  };

  const generateSavingsTips = () => {
    const overSpentCategories = categories.filter((category) => {
      const totalSpent = expenses
        .filter((expense) => expense.category === category.name)
        .reduce((sum, expense) => sum + expense.amount, 0);
      return totalSpent > category.limit * 0.8;
    });

    if (overSpentCategories.length > 0) {
      return overSpentCategories.map(
        (cat) => `"${cat.name}" kategorisinde tasarruf yapmayı düşünün.`
      );
    }

    return ["Harcamalarınız dengeli görünüyor!"];
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Finansal Rapor", 10, 10);
    doc.text(`Toplam Gelir: ${totalIncome} TL`, 10, 20);
    doc.text(`Toplam Gider: ${totalExpense} TL`, 10, 30);
    doc.text("Gelir ve Giderler:", 10, 40);

    expenses.forEach((expense, index) => {
      doc.text(
        `${index + 1}. ${expense.date} - ${expense.description} - ${expense.amount} TL (${expense.type})`,
        10,
        50 + index * 10
      );
    });

    doc.save("finansal-rapor.pdf");
  };

  return (
    <div
      className={`max-w-6xl mx-auto p-6 ${
        isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Bütçe Yönetim Paneli</h1>
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Add Category */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-lg font-bold mb-4">Kategori Ekle</h2>
        <input
          type="text"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          placeholder="Kategori Adı"
          className="border p-2 mr-2"
        />
        <input
          type="number"
          value={newCategory.limit}
          onChange={(e) => setNewCategory({ ...newCategory, limit: parseInt(e.target.value) })}
          placeholder="Bütçe Limiti"
          className="border p-2 mr-2"
        />
        <button onClick={addCategory} className="px-4 py-2 bg-green-500 text-white rounded">
          Kategori Ekle
        </button>
      </div>

      {/* Add Expense */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="text-lg font-bold mb-4">Gelir/Gider Ekle</h2>
        <input
          type="text"
          value={newExpense.description}
          onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
          placeholder="Açıklama"
          className="border p-2 mr-2"
        />
        <input
          type="number"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) })}
          placeholder="Tutar"
          className="border p-2 mr-2"
        />
        <input
          type="date"
          value={newExpense.date}
          onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
          className="border p-2 mr-2"
        />
        <select
          value={newExpense.type}
          onChange={(e) => setNewExpense({ ...newExpense, type: e.target.value })}
          className="border p-2 mr-2"
        >
          <option value="income">Gelir</option>
          <option value="expense">Gider</option>
        </select>
        <select
          value={newExpense.category}
          onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
          className="border p-2 mr-2"
        >
          <option value="">Kategori Seç</option>
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <button onClick={addExpense} className="px-4 py-2 bg-green-500 text-white rounded">
          Ekle
        </button>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-bold mb-4">Gelir ve Gider Dağılımı</h2>
          <div style={{ width: "400px", height: "400px", margin: "0 auto" }}>
            <canvas id="pieChart"></canvas>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4">Kategori Bazlı Harcamalar</h2>
          <div style={{ width: "100%", height: "400px", margin: "0 auto" }}>
            <canvas id="barChart"></canvas>
          </div>
        </div>
      </div>

      {/* Expense List */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">Harcamalar</h2>
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border px-4 py-2">Tarih</th>
              <th className="border px-4 py-2">Açıklama</th>
              <th className="border px-4 py-2">Tutar</th>
              <th className="border px-4 py-2">Tür</th>
              <th className="border px-4 py-2">Kategori</th>
              <th className="border px-4 py-2">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td className="border px-4 py-2">{expense.date}</td>
                <td className="border px-4 py-2">{expense.description}</td>
                <td className="border px-4 py-2">{expense.amount} TL</td>
                <td className="border px-4 py-2">{expense.type === "income" ? "Gelir" : "Gider"}</td>
                <td className="border px-4 py-2">{expense.category}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => startEditing(expense)}
                    className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => deleteExpense(expense.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Download PDF */}
      <div className="mt-6 text-center">
        <button
          onClick={downloadPDF}
          className="px-6 py-3 bg-blue-500 text-white rounded"
        >
          PDF İndir
        </button>
      </div>

      {/* Savings Tips */}
      <div className="mt-6 p-4 border rounded">
        <h2 className="text-lg font-bold mb-4">Tasarruf İpuçları</h2>
        <ul>
          {generateSavingsTips().map((tip, index) => (
            <li key={index} className="mb-2">
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
