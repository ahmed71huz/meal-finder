import { useState } from 'react'
function App() {
  const [meal, setMeal] = useState(null)
  const [meals, setMeals] = useState([]);
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function loadMeal() {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    const data = await res.json()
    setMeal(data.meals[0])
  }
  async function searchMeals() {
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
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="search meals .."
        />
      <button onClick={searchMeals}>Search</button>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      {meal && (
        <div>
          <h2>{meal.strMeal}</h2>
          <img className="meal-img" src={meal.strMealThumb} alt={meal.strMeal} />
          <p>{meal.strCategory} ·  {meal.strArea}</p>
        </div>
      )}
      {meals.map((m) => (
        <div key={m.idMeal}>
          <h3>{m.strMeal}</h3>
          <img className="meal-img" src={m.strMealThumb} alt={m.strMeal} />

        </div>
      ))}
    </div>
  )
}

export default App