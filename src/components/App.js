import React, { Component } from 'react';
import './../App.css';
import { addRecipe } from './../actions/index.js'

class App extends Component {

  state = {
    calendra: null
  }

  componentDidMount() {

    const { store } = this.props;

    store.subscribe(() => {

      this.setState(() => (
        {
          calendra: store.getState()
        }
      ));
    });

  }

  submitFood = () => {

    this.props.store.dispatch(addRecipe(
      {
        day: 'monday',
        recipe: {
          label: this.recipe.value
        },
        meal: 'breakfast'
      }
    ));

    this.recipe.value = '';
  }

  render() {

    return (
      <div className="App">

        <pre>
          Monday BreakFast: {this.state.calendra && this.state.calendra.monday.breakfast}
        </pre>

        <input type="text"
          ref={(inputDom) => this.recipe = inputDom}
          placeholder="Enter input"
        />
        <button onClick={this.submitFood}>Click</button>
      </div>
    );
  }
}

export default App;
