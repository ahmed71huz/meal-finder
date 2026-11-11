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
   <h1>love pizza</h1>
  <button onClick={loadMeal}>random meal</button>
  {meal && <h2>{meal.strMeal}</h2>}
  </div>
  )
}

export default App