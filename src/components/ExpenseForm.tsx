import { useState } from "react";

const ExpenseForm = ({ onAddExpense, onClose, editingExpense, onEditExpense }: any) => {
  const [formState, setFormState] = useState(
    editingExpense || { description: "", amount: 0, category: "", type: "expense" }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingExpense) {
      onEditExpense(editingExpense.id, formState); // Use the correct prop here
    } else {
      onAddExpense({ ...formState, id: Date.now() }); // Add new expense
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-100 rounded shadow">
      <div>
        <label className="block mb-1 font-bold">Description</label>
        <input
          type="text"
          value={formState.description}
          onChange={(e) => setFormState({ ...formState, description: e.target.value })}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-bold">Amount</label>
        <input
          type="number"
          value={formState.amount}
          onChange={(e) => setFormState({ ...formState, amount: Number(e.target.value) })}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-bold">Category</label>
        <input
          type="text"
          value={formState.category}
          onChange={(e) => setFormState({ ...formState, category: e.target.value })}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-bold">Type</label>
        <select
          value={formState.type}
          onChange={(e) => setFormState({ ...formState, type: e.target.value })}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div className="flex justify-between items-center">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {editingExpense ? "Edit Expense" : "Add Expense"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
