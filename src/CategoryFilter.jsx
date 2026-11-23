

export default function CategoryFilter({ categories, onSelect }) {
    return (
        <div>
            {categories.map((c) => (
                <button key={c.idCategory} onClick={() => onSelect(c.strCategory)}>{c.strCategory}</button>
            ))}
        </div>
    )
}
