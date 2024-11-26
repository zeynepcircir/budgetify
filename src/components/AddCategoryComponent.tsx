import { useState } from "react";

type AddCategoryProps = {
  onAddCategory: (name: string, limit: number) => void;
};

const AddCategoryComponent = ({ onAddCategory }: AddCategoryProps) => {
  const [newCategory, setNewCategory] = useState<{ name: string; limit: number }>({
    name: "",
    limit: 0,
  });

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.limit) {
      onAddCategory(newCategory.name, newCategory.limit);
      setNewCategory({ name: "", limit: 0 });
    } else {
      alert("Lütfen kategori adı ve limiti girin!");
    }
  };

  return (
    <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Kategori Ekle</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddCategory();
        }}
        className="space-y-6"
      >
        <div>
          <label
            htmlFor="categoryName"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Kategori Adı
          </label>
          <input
            id="categoryName"
            type="text"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            placeholder="Örn: Eğlence, Ulaşım"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <div>
          <label
            htmlFor="categoryLimit"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Bütçe Limiti (₺)
          </label>
          <input
            id="categoryLimit"
            type="number"
            value={newCategory.limit}
            onChange={(e) =>
              setNewCategory({ ...newCategory, limit: parseInt(e.target.value) })
            }
            placeholder="Örn: 500, 1000"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200"
        >
          Kategori Ekle
        </button>
      </form>
    </div>
  );
};

export default AddCategoryComponent;
