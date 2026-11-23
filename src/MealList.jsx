import MealCard from "./MealCard"

export default function MealList({ meals, onSelect }) {
    return (
        <div className="grid">
            {meals.map((m) => (
                <MealCard key={m.idMeal} name={m.strMeal} image={m.strMealThumb} onSelect={() => onSelect(m.idMeal)} />
            ))}
        </div>
    )
}