import React from "react";

export interface AddExpenseProps {
  categories: { name: string; limit: number }[];
  onAddExpense: () => void;
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

const AddExpenseComponent: React.FC<AddExpenseProps> = ({
  categories,
  onAddExpense,
  newExpense,
  setNewExpense,
  editingExpense,
}) => {
  const handleInputChange = (field: string, value: string | number) => {
    setNewExpense((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isFormValid =
    newExpense.description &&
    newExpense.amount > 0 &&
    newExpense.type &&
    newExpense.category &&
    newExpense.date;

  return (
    <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
        {editingExpense ? "Harcamayı Düzenle" : "Yeni Harcama Ekle"}
      </h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!isFormValid) {
            alert("Lütfen tüm alanları doldurun!");
            return;
          }
          onAddExpense();
        }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Açıklama
            </label>
            <input
              type="text"
              value={newExpense.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="w-full mt-1 rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Harcamayı açıklayın"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Tutar</label>
            <input
              type="number"
              value={newExpense.amount || ""}
              onChange={(e) =>
                handleInputChange("amount", parseFloat(e.target.value) || 0)
              }
              className="w-full mt-1 rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Tutarı girin"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">Tür</label>
            <select
              value={newExpense.type || ""}
              onChange={(e) => handleInputChange("type", e.target.value)}
              className="w-full mt-1 rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Tür Seç</option>
              <option value="income">Gelir</option>
              <option value="expense">Gider</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Kategori</label>
            <select
              value={newExpense.category || ""}
              onChange={(e) => handleInputChange("category", e.target.value)}
              className="w-full mt-1 rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Kategori Seç</option>
              {categories.map((category) => (
                <option key={category.name} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Tarih</label>
          <input
            type="date"
            value={newExpense.date || ""}
            onChange={(e) => handleInputChange("date", e.target.value)}
            className="w-full mt-1 rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full mt-8 py-3 rounded-lg text-white font-semibold ${
            isFormValid
              ? "bg-blue-500 hover:bg-blue-600 transition duration-200"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {editingExpense ? "Kaydet" : "Ekle"}
        </button>
      </form>
    </div>
  );
};

export default AddExpenseComponent;
