
function MealDetails({ details, ingredients, steps, onClose }) {
    return (
        <div className="overlay">
            {details && (
                <div className="box">
                    <h2>{details.strMeal}</h2>
                    <ul>
                        {ingredients.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                    <h3>Instructions</h3>
                    {steps.map((d, index) => (
                        <p key={index}  >{d}</p>
                    ))}
                    <button onClick={onClose}>Close</button>
                    
                </div>
            )}
        </div>
    )
}

export default MealDetails