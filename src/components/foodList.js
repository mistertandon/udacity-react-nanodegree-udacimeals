import React from 'react';

const FoodList = ({ food, onSelect }) => {

  return (

    <ul className="food-list">
      {
        food.map((recipe, index) => (
          <li onClick={
            (recipe4) => {
              onSelect(recipe)
            }
          }
            key={`${recipe.label}${index}`}
          >
            <h3>{recipe.label}</h3>
            <img src={recipe.image} alt={recipe.label} />
            <div>{Math.floor(recipe.calories)}</div>
            <div>{recipe.source}</div>
          </li>
        ))
      }
    </ul>
  );
}

export default FoodList;