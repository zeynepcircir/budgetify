import React, { useState } from "react";
import AddCategoryComponent from "@/components/AddCategoryComponent";
import AddExpenseComponent from "@/components/AddExpenseComponent";

interface ExpenseAndCategoryTabsProps {
  onAddCategory: (name: string, limit: number) => void;
  onAddExpense: () => void;
  categories: { name: string; limit: number }[];
  newExpense: {
    description: string;
    amount: number;
    type: string;
    category: string;
    date: string;
  };
  setNewExpense: React.Dispatch<React.SetStateAction<any>>;
  editingExpense: {
    id: number;
    description: string;
    amount: number;
    type: string;
    category: string;
    date: string;
  } | null;
}

const ExpenseAndCategoryTabs: React.FC<ExpenseAndCategoryTabsProps> = ({
  onAddCategory,
  onAddExpense,
  categories,
  newExpense,
  setNewExpense,
  editingExpense,
}) => {
  const [activeTab, setActiveTab] = useState("addExpense"); 

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Tab Headings */}
      <div className="flex border-b border-gray-300 mb-4">
        <button
          onClick={() => setActiveTab("addExpense")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "addExpense"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Harcama Ekle
        </button>
        <button
          onClick={() => setActiveTab("addCategory")}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === "addCategory"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Kategori Ekle
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "addExpense" && (
          <AddExpenseComponent
            categories={categories}
            onAddExpense={onAddExpense}
            newExpense={newExpense}
            setNewExpense={setNewExpense}
            editingExpense={editingExpense}
          />
        )}
        {activeTab === "addCategory" && (
          <AddCategoryComponent onAddCategory={onAddCategory} />
        )}
      </div>
    </div>
  );
};

export default ExpenseAndCategoryTabs;
