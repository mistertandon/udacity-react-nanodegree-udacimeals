import React, { Component } from 'react';
import './../App.css';
import { connect } from 'react-redux';
import { addRecipe, removeFromCalendar } from './../actions/index';
import { capitalize } from './../utils/helpers';
import FaArrowCircleRight from 'react-icons/lib/fa/arrow-circle-right';
import FaCalendarPlusO from 'react-icons/lib/fa/calendar-plus-o';
import Modal from 'react-modal';
import Loading from 'react-loading'
import { fetchRecipes } from '../utils/api.js';
import FoodList from './foodList';
import ShoppingList from './shoppingList';

class App extends Component {

  state = {
    foodModalOpen: false,
    meal: null,
    day: null,
    food: null,
    loadingFood: false,
    ingrediantsModalOpen: false
  }

  componentDidMount() {
    Modal.setAppElement('.container');
  }

  openFoodModal = ({ meal, day }) => {

    this.setState(() => (
      {
        foodModalOpen: true,
        meal,
        day
      }
    ))
  }

  closeFoodModal = () => {

    this.setState(() => (
      {
        foodModalOpen: false,
        meal: null,
        day: null,
        food: null
      }
    ));
  }

  searchFood = (e) => {

    if (!this.input.value) {
      return;
    }

    e.preventDefault();
    this.setState(() => ({
      loadingFood: true
    }));

    fetchRecipes(this.input.value)
      .then((food) => {
        console.log(food);
        this.setState(() => (
          {
            food,
            loadingFood: false
          }
        ));
      });
  }

  openIngrediantsModal = () => {

    this.setState(() => ({ ingrediantsModalOpen: true }));
  }

  closeIngrediantsModal = () => {

    this.setState(() => ({ ingrediantsModalOpen: false }));
  }

  generateShoppingList = () => {

    console.log(this.props.calendar);
    return this.props.calendar
      .reduce(
        (result, { day, meals }) => {

          const { breakfast, lunch, dinner } = meals;

          breakfast && result.push(breakfast);
          lunch && result.push(lunch);
          dinner && result.push(dinner);

          return result;
        },
        []
      )
      .reduce(
        (results, { ingredientLines }) => results.concat(ingredientLines, []),
        []
      )
  }

  render() {

    const { food, loadingFood, foodModalOpen, ingrediantsModalOpen } = this.state;
    const { selectRecipe, calendar, remove } = this.props;
    const mealOrder = ['breakfast', 'lunch', 'dinner'];

    return (
      <div className='container'>
        <div className='nav'>
          <h1 className='header'>Udacimeals</h1>
          <button className='shopping-list'
            onClick={this.openIngrediantsModal}
          >
            Shopping List
          </button>
        </div>
        <ul className='meal-types'>
          {
            mealOrder.map((meal) => (
              <li key={meal} className='subheader'>
                {
                  capitalize(meal)
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
          <div className='icon-grid'>
            {
              calendar.map(({ day, meals }) => (
                <ul key={`${day}_meal`}>
                  {
                    mealOrder.map((meal) => (
                      <li key={`${day}_${meal}`} className='meal'>
                        {
                          meals[meal] ?
                            <div className='food-item'>
                              <img src={meals[meal].image} alt={meals[meal].label} />
                              <button onClick={
                                () => {
                                  remove({ day: day, meal: meal });
                                }
                              }>Clear</button>
                            </div>
                            : <button onClick={
                              () => {
                                this.openFoodModal({ meal, day })
                              }
                            } className='icon-btn'>
                              <FaCalendarPlusO size={30} />
                            </button>
                        }
                      </li>
                    ))
                  }
                </ul>
              ))
            }
          </div>
        </div>
        <Modal isOpen={ingrediantsModalOpen}
          className='modal'
          overlayClassName='overlay'
          onRequestClose={this.closeIngrediantsModal}
          contentLabel='Shopping List Modal'
        >
          {
            ingrediantsModalOpen &&
            <ShoppingList ingredientLines={this.generateShoppingList()} />
          }
        </Modal>
        <Modal isOpen={this.state.foodModalOpen}
          className='modal'
          overlayClassName='overlay'
          contentLabel='Modal'
          onRequestClose={this.closeFoodModal}
        >
          {
            loadingFood === true ?
              <Loading type="bubbles" color="#C7C7C7" height='667' width='375' />
              : <div className="searc-container">
                <h3 className="subheader">
                  Find a meal for {`${capitalize(this.state.day)} ${capitalize(this.state.meal)}`}
                </h3>
                <div className="search">
                  <input
                    className="food-input"
                    type="text"
                    placeholder="search food"
                    ref={(input) => {
                      this.input = input;
                    }}
                  />
                  <button className="icon-btn"
                    onClick={this.searchFood}
                  >
                    <FaArrowCircleRight size={30} />
                  </button>
                </div>
                {
                  food !== null &&
                  <FoodList food={food}
                    onSelect={(recipe) => {

                      selectRecipe({ recipe, day: this.state.day, meal: this.state.meal })
                    }}
                  />
                }
              </div>
          }
        </Modal>
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
    selectRecipe: (actionInputData) => {
      dispatch(addRecipe(actionInputData))
    },
    remove: (actionInputData) => {
      dispatch(removeFromCalendar(actionInputData))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
