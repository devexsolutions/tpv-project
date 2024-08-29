// components/CategoryList.js
export default function CategoryList({ categories, onSelectCategory, selectedCategory }) {
    return (
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Categorías</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`px-4 py-2 rounded ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    );
  }
  