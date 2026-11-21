
function MealCard(props){
    return <div onClick={props.onSelect}>
        <h3>{props.name}</h3>
        <img className="meal-img" src={props.image} alt={props.name}/>

    </div>

}
export default MealCard