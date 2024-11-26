import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CategoryExpensesComponent from "@/components/CategoryExpensesComponent";
import EditExpenseComponent from "@/components/EditExpenseComponent";
import ExpenseAndCategoryTabs from "@/components/ExpenseAndCategoryTabs";
import ExpenseListComponent from "@/components/ExpenseListComponent";
import FinancialReportComponent from "@/components/FinancialReportComponent";
import IncomeExpenseDistributionComponent from "@/components/IncomeExpenseDistributionComponent";
import SavingsTipsComponent from "@/components/SavingsTipsComponent";

const Dashboard = () => {
  const router = useRouter();
  const [expenses, setExpenses] = useState<any[]>([]);
  const [categories, setCategories] = useState<{ name: string; limit: number }[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [editingExpense, setEditingExpense] = useState<any | null>(null);
  const [newExpense, setNewExpense] = useState<any>({
    description: "",
    amount: 0,
    type: "income",
    category: "",
    date: "",
  });

  const totalIncome = expenses
    .filter((item) => item.type === "income")
    .reduce((total, item) => total + item.amount, 0);

  const totalExpense = expenses
    .filter((item) => item.type === "expense")
    .reduce((total, item) => total + item.amount, 0);

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

  const addExpense = () => {
    if (editingExpense) {
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === editingExpense.id ? { ...editingExpense, ...newExpense } : expense
        )
      );
      setEditingExpense(null);
    } else {
      setExpenses((prevExpenses) => [
        ...prevExpenses,
        { ...newExpense, id: Date.now() },
      ]);
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

  const addCategory = (name: string, limit: number) => {
    if (!categories.find((c) => c.name === name)) {
      setCategories([...categories, { name, limit }]);
    } else {
      alert(`"${name}" adlı bir kategori zaten mevcut!`);
    }
  };

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className={`max-w-7xl mx-auto py-10 px-6 ${isDarkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-800"}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-200">
          Bütçe Yönetim Paneli
        </h1>
        <div className="flex items-center gap-4">
     <button
  onClick={() => setIsDarkMode((prev) => !prev)}
  className="flex items-center gap-2 px-6 py-3 bg-purple-100 text-purple-700 font-medium rounded-lg border border-slate-800  hover:bg-purple-200 hover:text-purple-800 shadow-sm transition"
>
  {isDarkMode ? "Aydınlık Mod" : "Karanlık Mod"}
</button>
<button
  onClick={handleLogout}
  className="flex items-center gap-2 px-6 py-3 bg-rose-100 text-rose-700 font-medium rounded-lg border border-slate-800 hover:bg-rose-200 hover:text-rose-800 shadow-sm transition"
>
  Çıkış Yap
</button>

        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="p-6 bg-green-100 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-green-800">Toplam Gelir</h3>
          <p className="text-2xl font-bold text-green-900">₺{totalIncome.toFixed(2)}</p>
        </div>
        <div className="p-6 bg-red-100 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-red-800">Toplam Gider</h3>
          <p className="text-2xl font-bold text-red-900">₺{totalExpense.toFixed(2)}</p>
        </div>
        <div className="p-6 bg-blue-100 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-semibold text-blue-800">Bakiye</h3>
          <p className="text-2xl font-bold text-blue-900">₺{(totalIncome - totalExpense).toFixed(2)}</p>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Expense/Category */}
        <div className="lg:col-span-3 p-6 bg-white rounded-lg shadow-md">
          <ExpenseAndCategoryTabs
            onAddCategory={addCategory}
            onAddExpense={addExpense}
            categories={categories}
            newExpense={newExpense}
            setNewExpense={setNewExpense}
            editingExpense={editingExpense}
          />
        </div>

        {/* Income/Expense Distribution */}
        <div className="lg:col-span-2 p-6 bg-white rounded-lg shadow-md">
          <IncomeExpenseDistributionComponent expenses={expenses} categories={categories} />
        </div>

        {/* Category Expenses */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <CategoryExpensesComponent
            categories={categories}
            expenses={expenses}
            onDeleteCategory={(categoryName) =>
              setCategories((prevCategories) =>
                prevCategories.filter((category) => category.name !== categoryName)
              )
            }
          />
        </div>

        {/* Expense List */}
        <div className="lg:col-span-3 p-6 bg-white rounded-lg shadow-md">
          <ExpenseListComponent
            expenses={expenses}
            onEdit={startEditing}
            onDelete={deleteExpense}
          />
        </div>

        {/* Edit Expense */}
        <div className="lg:col-span-3 p-6 bg-white rounded-lg shadow-md">
          <EditExpenseComponent
            editingExpense={editingExpense}
            setEditingExpense={setEditingExpense}
            setExpenses={setExpenses}
            categories={categories}
          />
        </div>

        {/* Savings Tips */}
        <div className="lg:col-span-3 p-6 bg-white rounded-lg shadow-md">
          <SavingsTipsComponent categories={categories} expenses={expenses} />
        </div>

        {/* Financial Report */}
        <div className="lg:col-span-3 p-6 ">
          <FinancialReportComponent expenses={expenses} totalIncome={totalIncome} totalExpense={totalExpense} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
