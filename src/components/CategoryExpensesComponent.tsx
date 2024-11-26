import React from "react";

interface CategoryExpensesProps {
  categories: { name: string; limit: number }[];
  expenses: { category: string; amount: number }[];
  onDeleteCategory: (categoryName: string) => void; 
}

const CategoryExpensesComponent: React.FC<CategoryExpensesProps> = ({
  categories,
  expenses,
  onDeleteCategory,
}) => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-4">Kategoriler</h2>
      {categories.map((category) => {
        const totalSpent = expenses
          .filter((expense) => expense.category === category.name)
          .reduce((sum, expense) => sum + expense.amount, 0);

        const percentageSpent = ((totalSpent / category.limit) * 100).toFixed(0);
        const isOverLimit = totalSpent >= category.limit;
        const isNearLimit = totalSpent >= category.limit * 0.8;

        return (
          <div
            key={category.name}
            className="bg-gray-100 p-4 mb-4 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center">
              <div className="text-lg font-bold">{category.name}</div>
              <div
                className={`text-sm font-semibold ${
                  totalSpent > category.limit ? "text-red-500" : "text-green-500"
                }`}
              >
                {totalSpent > category.limit ? "Gider" : "Gelir"}
              </div>
              <button
                className="text-red-500 text-sm font-bold"
                onClick={() => onDeleteCategory(category.name)} 
              >
                Sil
              </button>
            </div>
            <div className="mt-2">
              <div className="text-sm">
                ₺{totalSpent.toLocaleString()} / ₺
                {category.limit.toLocaleString()}
              </div>
              <div className="relative h-2 w-full bg-gray-300 rounded-full overflow-hidden mt-1">
                <div
                  className={`h-full ${
                    isOverLimit
                      ? "bg-red-500"
                      : isNearLimit
                      ? "bg-orange-500"
                      : "bg-green-500"
                  }`}
                  style={{
                    width: `${Math.min(Number(percentageSpent), 100)}%`,
                  }}
                ></div>
              </div>
              <div className="mt-1 text-sm text-gray-600 flex justify-between">
                <div>{percentageSpent}%</div>
                {isNearLimit && !isOverLimit && (
                  <div className="text-orange-500">
                    Uyarı: Bütçe limitine yaklaşıyorsunuz!
                  </div>
                )}
                {isOverLimit && (
                  <div className="text-red-500 font-semibold">
                    Limit aşıldı!
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryExpensesComponent;
