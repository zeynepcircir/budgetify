const MonthlySummary = ({ expenses }: { expenses: any[] }) => {
    const currentMonth = "Haziran"; // Dinamik hale getirilebilir
    const monthlyIncome = expenses
      .filter((item) => item.type === "income")
      .reduce((total, item) => total + item.amount, 0);
    const monthlyExpense = expenses
      .filter((item) => item.type === "expense")
      .reduce((total, item) => total + item.amount, 0);
  
    return (
      <div className="p-4 bg-gray-800 rounded mb-4">
        <h2 className="text-lg font-bold mb-2">{currentMonth}</h2>
        <p>Ödenen: <span className="text-green-400">₺{monthlyIncome.toLocaleString("tr-TR")}</span></p>
        <p>Kalan: <span className="text-yellow-400">₺{(monthlyIncome - monthlyExpense).toLocaleString("tr-TR")}</span></p>
      </div>
    );
  };
  
  export default MonthlySummary;
  