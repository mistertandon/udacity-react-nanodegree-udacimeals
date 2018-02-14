import React, { Component } from 'react';
import './../App.css';
import { connect } from 'react-redux';
import { addRecipe, removeFromCalendar } from './../actions/index';
import { capitalize } from './../utils/helpers';
import FaCalendarPlusO from 'react-icons/lib/fa/calendar-plus-o';

class App extends Component {

  clickHandler = () => {

    this.props.addRecipe({ day: 'monday', recipe: 'Chaap', meal: 'lunch' })
  }

  render() {

    console.log(this.props);
    const { addRecipe, calendar } = this.props;
    const mealOrder = ['breakfast', 'lunch', 'dinner'];

    return (
      <div className='container'>
        <ul className='meal-types'>
          {
            mealOrder.map((mealType) => (
              <li key={mealType} className='subheader'>
                {
                  capitalize(mealType)
                }
              </li>
            ))
          }
        </ul>
        <div className='calendar'>
          <div className='days'>
            {
              calendar.map(({ day }) => (<h3 key={day} className='subheader'>{capitalize(day)}</h3>))
            }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(calendar) {

  const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return {

    calendar: dayOrder.map(day => ({
      day,
      meals: Object.keys(calendar[day]).reduce(
        (meals, meal) => {

          meals[meal] = calendar[day][meal] ? calendar[day][meal] : null;
          return meals;
        },
        {}
      )
    }))
  }
}

function mapDispatchToProps(dispatch) {

  return {
    addRecipe: (actionInputData) => {
      dispatch(addRecipe(actionInputData))
    },
    removeRecipe: (actionInputData) => {
      dispatch(removeFromCalendar(actionInputData))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
