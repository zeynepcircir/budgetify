import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";

const CategoryForm = () => {
  const { addCategory } = useGlobalContext();
  const [name, setName] = useState("");
  const [limit, setLimit] = useState(0);

  const handleSubmit = () => {
    if (!name || limit <= 0) return alert("Lütfen tüm alanları doldurun!");

    const newCategory = {
      id: Date.now(),
      name,
      limit,
      spent: 0,
    };
    addCategory(newCategory);
    setName("");
    setLimit(0);
  };

  return (
    <div>
      <h3>Kategori Ekle</h3>
      <input
        type="text"
        placeholder="Kategori Adı"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Bütçe Limiti"
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
      />
      <button onClick={handleSubmit}>Ekle</button>
    </div>
  );
};

export default CategoryForm;
