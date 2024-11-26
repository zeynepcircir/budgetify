import React from "react";

interface SavingsTipsProps {
  categories: { name: string; limit: number }[];
  expenses: { category: string; amount: number }[];
}

const SavingsTipsComponent: React.FC<SavingsTipsProps> = ({
  categories,
  expenses,
}) => {
  const generateSavingsTips = () => {
    const overSpentCategories = categories.filter((category) => {
      const totalSpent = expenses
        .filter((expense) => expense.category === category.name)
        .reduce((sum, expense) => sum + expense.amount, 0);
      return totalSpent > category.limit * 0.8;
    });

    if (overSpentCategories.length > 0) {
      return overSpentCategories.map(
        (cat) => `"${cat.name}" kategorisinde tasarruf yapmayı düşünün.`
      );
    }

    return ["Harcamalarınız dengeli görünüyor!"];
  };

  const savingsTips = generateSavingsTips();

  return (
    <div className="mt-6 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Tasarruf Önerileri</h2>
      <ul className="space-y-3">
        {savingsTips.map((tip, index) => (
          <li
            key={index}
            className="bg-gray-100 p-3 rounded-lg text-sm text-gray-700 shadow-sm border-l-4 border-blue-500"
          >
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavingsTipsComponent;
