import React, { createContext, useState, useContext } from "react";

type Category = {
  id: number;
  name: string;
  limit: number; 
  spent: number; 
};

type Expense = {
  id: number;
  type: "income" | "expense";
  category: string;
  amount: number;
  description: string;
  date: string;
};

type GlobalContextType = {
  categories: Category[];
  expenses: Expense[];
  addCategory: (category: Category) => void;
  addExpense: (expense: Expense) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addCategory = (category: Category) => {
    setCategories((prev) => [...prev, category]);
  };

  const addExpense = (expense: Expense) => {
    setExpenses((prev) => [...prev, expense]);
    setCategories((prev) =>
      prev.map((cat) =>
        cat.name === expense.category
          ? { ...cat, spent: cat.spent + expense.amount }
          : cat
      )
    );
  };

  return (
    <GlobalContext.Provider value={{ categories, expenses, addCategory, addExpense }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
