type Expense = {
    id: number;
    amount: number;
    description: string;
    date: string;
    category: string;
    type: "income" | "expense";
  };
  
 
  let expenses: Expense[] = [];
  

  export const addExpense = (expense: Expense) => {
    expenses.push(expense);
  };
  
 
  export const editExpense = (id: number, updatedExpense: Expense) => {
    expenses = expenses.map((expense) =>
      expense.id === id ? { ...expense, ...updatedExpense } : expense
    );
  };
  

  export const deleteExpense = (id: number) => {
    expenses = expenses.filter((expense) => expense.id !== id);
  };
  

  export const filterExpensesByCategory = (category: string) => {
    return expenses.filter((expense) => expense.category === category);
  };
  
 
  export const filterExpensesByDate = (startDate: string, endDate: string) => {
    return expenses.filter(
      (expense) =>
        new Date(expense.date) >= new Date(startDate) &&
        new Date(expense.date) <= new Date(endDate)
    );
  };
  