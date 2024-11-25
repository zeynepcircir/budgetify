type Expense = {
    id: number;
    type: "income" | "expense";
    amount: number;
    category: string;
    description: string;
    date: string;
  };
  
  type ExpenseListProps = {
    expenses: Expense[];
    onEdit: (expense: Expense) => void;
    onDelete: (id: number) => void;
  };
  
  const ExpenseList: React.FC<ExpenseListProps> = ({
    expenses,
    onEdit,
    onDelete,
  }) => {
    return (
      <ul className="space-y-4">
        {expenses.map((expense) => (
          <li
            key={expense.id}
            className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow"
          >
            <div>
              <p className="font-bold">{expense.description}</p>
              <p className="text-sm text-gray-500">{expense.category}</p>
              <p className="text-sm text-gray-500">{expense.date}</p>
              <p
                className={`text-lg font-bold ${
                  expense.type === "income" ? "text-green-500" : "text-red-500"
                }`}
              >
                {expense.type === "income" ? "+" : "-"}₺{expense.amount}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(expense)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Düzenle
              </button>
              <button
                onClick={() => onDelete(expense.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Sil
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  };
  
  export default ExpenseList;
  