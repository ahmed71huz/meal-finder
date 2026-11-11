import {useState} from 'react'
function App() {
  const [meal, setMeal] = useState(null)
  async function loadMeal() {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)    
    const data = await res.json()
    setMeal(data.meals[0])
  }
  return (
    <div>
   <h1>Meal Finder</h1>
  <button onClick={loadMeal}>random meal</button>
  {meal &&(
    <div>
      <h2>{meal.strMeal}</h2> 
      <h3>{meal.strCategory}</h3>
      <img className="meal-img" src={meal.strMealThumb} alt={meal.strMeal}/>
      <p>{meal.strCategory} ·  {meal.strArea}</p>
      </div>
    )}
  </div>
  )
}

export default App