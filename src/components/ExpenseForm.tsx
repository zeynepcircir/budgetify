import { useState } from "react";

type ExpenseFormProps = {
  onClose: () => void; 
  editingExpense?: {
    id: number;
    amount: number;
    description: string;
    date: string;
    category: string;
    type: "income" | "expense";
  }; 
  addExpense: (expense: any) => void; 
  editExpense: (id: number, updatedExpense: any) => void; 
};

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  onClose,
  editingExpense,
  addExpense,
  editExpense,
}) => {
  const [amount, setAmount] = useState(editingExpense?.amount || 0);
  const [description, setDescription] = useState(
    editingExpense?.description || ""
  );
  const [date, setDate] = useState(editingExpense?.date || "");
  const [category, setCategory] = useState(editingExpense?.category || "");
  const [type, setType] = useState<"income" | "expense">(
    editingExpense?.type || "expense"
  );

  const handleSubmit = () => {
    if (!amount || !description || !date || !category) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    const newExpense = {
      id: editingExpense?.id || Date.now(),
      amount,
      description,
      date,
      category,
      type,
    };

    if (editingExpense) {
      editExpense(editingExpense.id, newExpense); 
    } else {
      addExpense(newExpense); 
    }

    onClose(); 
  };

  return (
    <div className="p-4 bg-gray-100 rounded">
      <h2 className="text-xl font-bold mb-4">
        {editingExpense ? "Gider Düzenle" : "Yeni Gider Ekle"}
      </h2>
      <div className="mb-4">
        <input
          type="number"
          placeholder="Tutar"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Açıklama"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Kategori"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "income" | "expense")}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="income">Gelir</option>
          <option value="expense">Gider</option>
        </select>
      </div>
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {editingExpense ? "Güncelle" : "Ekle"}
      </button>
    </div>
  );
};

export default ExpenseForm;
