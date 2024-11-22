type Income = {
    id: number;
    amount: number;
    description: string;
    date: string;
    category: string;
  };
  
  
  let incomes: Income[] = [];
  
 
  export const addIncome = (income: Income) => {
    incomes.push(income);
  };
  
 
  export const editIncome = (id: number, updatedIncome: Income) => {
    incomes = incomes.map((income) =>
      income.id === id ? { ...income, ...updatedIncome } : income
    );
  };
  
  
  export const deleteIncome = (id: number) => {
    incomes = incomes.filter((income) => income.id !== id);
  };
  
 
  export const filterIncomesByCategory = (category: string) => {
    return incomes.filter((income) => income.category === category);
  };
  

  export const filterIncomesByDate = (startDate: string, endDate: string) => {
    return incomes.filter(
      (income) =>
        new Date(income.date) >= new Date(startDate) &&
        new Date(income.date) <= new Date(endDate)
    );
  };
  