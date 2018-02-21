import React from 'react';

const ShoppingList = ({ ingredientLines }) => {

  console.log(ingredientLines);
  return (
    <ul>
      {
        ingredientLines.length && (
          <h3>Your shopping list</h3>)
      }
      {
        ingredientLines.map(
          (ingrediant, index) => (
            <li key={`${index}_ingrediant`}>
              {ingrediant}
            </li>
          )
        )
      }
    </ul>
  );
}

export default ShoppingList;