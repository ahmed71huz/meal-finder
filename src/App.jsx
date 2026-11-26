import { useState, useEffect } from 'react'
import MealCard from './MealCard'
import SearchBar from './SearchBar'
import CategoryFilter from './CategoryFilter'
import MealList from './MealList'
import MealDetails from './MealDetails'

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
  const steps = details ? details.strInstructions.split("\r\n") : []
  const [favs, setFavs] = useState(() => {
    const saved = localStorage.getItem("favs")
    return saved ? JSON.parse(saved) : []
  })
  const [showFavs, setShowFavs] = useState(false)

useEffect(() => {
  localStorage.setItem("favs", JSON.stringify(favs))
}, [favs])
if (details) {
  for (let i = 1; i <= 20; i++) {
    const name = details["strIngredient" + i]
    const measure = details["strMeasure" + i]
    if (name) {
      ingredients.push((measure + " " + name).trim())
    }
  }
}
function toggleFav(meal) {
  const exists = favs.some((f) => f.idMeal === meal.idMeal)
  if(exists){
    setFavs(favs.filter((f) => f.idMeal !== meal.idMeal))
  }
  else {
    setFavs([...favs, meal])
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
      <CategoryFilter categories={categories} onSelect={loadByCategory} />
      <SearchBar value={query} onChange={setQuery} onSearch={searchMeals} />
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
      <button onClick={() => setShowFavs(!showFavs)}>Favourites</button>
      {details && (
        <MealDetails
          details={details}
          ingredients={ingredients}
          steps={steps}
          onClose={() => { setSelectedId(null); setDetails(null) }}
        />
      )}
      <MealList meals={showFavs ? favs : meals} onSelect={setSelectedId} favs={favs} onToggleFav={toggleFav} />
    </div>
  )
}

export default App