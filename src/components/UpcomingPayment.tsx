const UpcomingPayments = ({ expenses }: { expenses: any[] }) => {
    const now = new Date();
    
    const overduePayments = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate < now && expense.type === "expense";
    });
  
    const upcomingPayments = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= now && expense.type === "expense";
    });
  
    return (
      <div className="p-4 bg-gray-800 rounded">
        <h2 className="text-lg font-bold mb-4">Yaklaşan & Geciken Ödemeler</h2>
        <div>
          <h3 className="text-md font-bold text-red-500 mb-2">Geciken Ödemeler</h3>
          <ul className="space-y-2">
            {overduePayments.map((expense) => (
              <li key={expense.id} className="flex justify-between items-center">
                <span>{expense.description}</span>
                <span className="text-red-500">{expense.amount.toLocaleString("tr-TR")} TL</span>
                <span className="text-sm text-gray-400">{expense.date}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="text-md font-bold text-green-500 mb-2">Yaklaşan Ödemeler</h3>
          <ul className="space-y-2">
            {upcomingPayments.map((expense) => (
              <li key={expense.id} className="flex justify-between items-center">
                <span>{expense.description}</span>
                <span className="text-green-500">{expense.amount.toLocaleString("tr-TR")} TL</span>
                <span className="text-sm text-gray-400">{expense.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  export default UpcomingPayments;
  