import React, { createContext, useContext, useState } from "react";


type Expense = {
  id: number;
  amount: number;
  description: string;
  date: string;
  category: string;
  type: "income" | "expense"; 
};


type GlobalContextType = {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  editExpense: (id: number, updatedExpense: Expense) => void;
  deleteExpense: (id: number) => void;
};


const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [expenses, setExpenses] = useState<Expense[]>([]); 


  const addExpense = (expense: Expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };


  const editExpense = (id: number, updatedExpense: Expense) => {
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
    <GlobalContext.Provider
      value={{
        expenses,
        addExpense,
        editExpense,
        deleteExpense,
      }}
    >
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
