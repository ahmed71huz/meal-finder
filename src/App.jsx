import { useState, useEffect } from 'react'
import MealCard from './MealCard'

function App() {
  const [meal, setMeal] = useState(null)
  const [meals, setMeals] = useState([]);
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setsearched] = useState(false)
  const [categories, setCategories] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [details, setDetails] = useState(null);
  const ingredients = []

  if (details) {
    for (let i = 1; i <= 20; i++) {
      const name = details["strIngredient" + i];
      if (name) {
        ingredients.push(name);

      }
    }

  }
  useEffect(() => {
    if (!selectedId) return;
    fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + selectedId)
      .then(res => res.json())
      .then(data => setDetails(data.meals[0]));
  }, [selectedId]);
  useEffect(() => {
    async function loadCategories() {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
      const data = await res.json()
      setCategories(data.categories)
    }
    loadCategories()
  }, [])
  async function loadMeal() {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    const data = await res.json()
    setMeal(data.meals[0])
  }
  async function loadByCategory(name) {
    setsearched(true)
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`)
      if (!res.ok) {
        throw new Error()
      }
      const data = await res.json()
      setMeals(data.meals || [])
    } catch {
      setError('Could not load the category')
    }
    setLoading(false)
  }
  async function searchMeals() {
    setsearched(true)
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      if (!res.ok) {
        throw new Error()
      }
      const data = await res.json()
      setMeals(data.meals || [])
    } catch {
      setError('Could not load meals')
    }
    setLoading(false)
  }
  return (
    <div>
      <h1>Meal Finder</h1>
      <button onClick={loadMeal}>random meal</button><br></br>
      <div>
        {categories.map((c) => (
          <button key={c.idCategory} onClick={() => loadByCategory(c.strCategory)}>{c.strCategory}</button>
        ))}
      </div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="search meals .."
      />
      <button onClick={searchMeals}>Search</button>
      {loading && <p>Loading...</p>}
      {error && (
        <div>
          <p>{error}</p>
          <button onClick={searchMeals}>Try again</button>
        </div>
      )}
      {meals.length === 0 && searched && !loading && !error && <p>No meals found</p>}
      {meal && (
        <div>
          <h2>{meal.strMeal}</h2>
          <img className="meal-img" src={meal.strMealThumb} alt={meal.strMeal} />
          <p>{meal.strCategory} ·  {meal.strArea}</p>
        </div>
      )}
      <p>selected : {selectedId}</p>
      {details && <h2>{details.strMeal}</h2>}
      {meals.map((m) => (
        <MealCard key={m.idMeal} name={m.strMeal} image={m.strMealThumb} onSelect={() => setSelectedId(m.idMeal)} />
      ))}
    </div>
  )
}

export default App