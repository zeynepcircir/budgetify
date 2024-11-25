type CategoryListProps = {
    categories: { id: number; name: string; limit?: number }[];
  };
  
  const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
    return (
      <div>
        <h3 className="text-lg font-semibold mb-2">Kategoriler</h3>
        <ul className="list-disc pl-6">
          {categories.map((category) => (
            <li key={category.id} className="mb-2">
              {category.name} 
              {category.limit && ` - Limit: ₺${category.limit}`}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default CategoryList;
  