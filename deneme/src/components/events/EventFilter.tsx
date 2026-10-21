// src/components/events/EventFilter.tsx
import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  categories: Category[];
  searchText: string;
  selectedCategory: Category | "";
  onSearchChange: (text: string) => void;
  onCategoryChange: (category: Category | "") => void;
}

function EventFilter({ categories, searchText, selectedCategory, onSearchChange, onCategoryChange }: EventFilterProps) {
  return (
    <form className="filtre" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label htmlFor="arama">Etkinlik ara</label>
        <input 
          type="search" 
          id="arama" 
          placeholder="Örn. atölye, kariyer..." 
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="kategori-filtre">Kategori</label>
        <select 
          id="kategori-filtre"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value as Category | "")}
        >
          <option value="">Tümü</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
    </form>
  );
}

export default EventFilter;