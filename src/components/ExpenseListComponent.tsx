import React from "react";

interface ExpenseListProps {
  expenses: {
    id: number;
    description: string;
    amount: number;
    type: string;
    category: string;
    date: string;
  }[];
  onEdit: (expense: any) => void;
  onDelete: (id: number) => void;
}

const ExpenseListComponent: React.FC<ExpenseListProps> = ({
  expenses,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-4">Harcamalar</h2>
      <table className="w-full border border-gray-200 rounded-lg shadow-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left text-sm font-semibold text-gray-600">Tarih</th>
            <th className="border px-4 py-2 text-left text-sm font-semibold text-gray-600">Açıklama</th>
            <th className="border px-4 py-2 text-left text-sm font-semibold text-gray-600">Tutar</th>
            <th className="border px-4 py-2 text-left text-sm font-semibold text-gray-600">Tür</th>
            <th className="border px-4 py-2 text-left text-sm font-semibold text-gray-600">Kategori</th>
            <th className="border px-4 py-2 text-left text-sm font-semibold text-gray-600">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2 text-sm text-gray-700">{expense.date}</td>
              <td className="border px-4 py-2 text-sm text-gray-700">{expense.description}</td>
              <td className="border px-4 py-2 text-sm text-gray-700">{expense.amount} TL</td>
              <td className="border px-4 py-2 text-sm text-gray-700">
                {expense.type === "income" ? "Gelir" : "Gider"}
              </td>
              <td className="border px-4 py-2 text-sm text-gray-700">{expense.category}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => onEdit(expense)}
                  className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => onDelete(expense.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseListComponent;
