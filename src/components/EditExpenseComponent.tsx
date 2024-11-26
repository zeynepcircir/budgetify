import React from "react";

interface EditExpenseProps {
  editingExpense: {
    id: number;
    description: string;
    amount: number;
    type: string;
    category: string;
    date: string;
  } | null;
  setEditingExpense: React.Dispatch<React.SetStateAction<any | null>>;
  setExpenses: React.Dispatch<React.SetStateAction<any[]>>;
  categories: { name: string; limit: number }[];
}

const EditExpenseComponent: React.FC<EditExpenseProps> = ({
  editingExpense,
  setEditingExpense,
  setExpenses,
  categories,
}) => {
  const handleInputChange = (field: string, value: string | number) => {
    setEditingExpense((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    if (
      editingExpense &&
      editingExpense.description &&
      editingExpense.amount > 0 &&
      editingExpense.type &&
      editingExpense.category &&
      editingExpense.date
    ) {
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === editingExpense.id ? editingExpense : expense
        )
      );
      setEditingExpense(null);
    } else {
      alert("Lütfen tüm alanları doldurun!");
    }
  };

  if (!editingExpense) {
    return null; 
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Harcamayı Düzenle
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Açıklama
            </label>
            <input
              type="text"
              value={editingExpense.description}
              onChange={(e) =>
                handleInputChange("description", e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Tutar
            </label>
            <input
              type="number"
              value={editingExpense.amount}
              onChange={(e) =>
                handleInputChange("amount", parseFloat(e.target.value) || 0)
              }
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Tür
            </label>
            <select
              value={editingExpense.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="income">Gelir</option>
              <option value="expense">Gider</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Kategori
            </label>
            <select
              value={editingExpense.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Tarih
            </label>
            <input
              type="date"
              value={editingExpense.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => setEditingExpense(null)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              İptal
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Kaydet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExpenseComponent;
    