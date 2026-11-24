import MealCard from "./MealCard"

export default function MealList({ meals, onSelect, favs, onToggleFav }) {
    return (
        <div className="grid">
            {meals.map((m) => (
                <MealCard key={m.idMeal} name={m.strMeal} 
                meal={m} isFav={favs.some((f) => f.idMeal === m.idMeal)} 
                image={m.strMealThumb} onToggleFav={onToggleFav} 
                onSelect={() => onSelect(m.idMeal)} />
        
            ))}
        </div>
    )
}