import { ADD_RECIPE, REMOVE_FROM_CALENDRA } from '../actions/index.js'

const initialCalendraState = {
  'monday': {
    'breakfast': null,
    'lunch': null,
    'dinner': null
  },
  'tuesday': {
    'breakfast': null,
    'lunch': null,
    'dinner': null
  },
  'wednesday': {
    'breakfast': null,
    'lunch': null,
    'dinner': null
  },
  'thursday': {
    'breakfast': null,
    'lunch': null,
    'dinner': null
  },
  'friday': {
    'breakfast': null,
    'lunch': null,
    'dinner': null
  },
  'saturday': {
    'breakfast': null,
    'lunch': null,
    'dinner': null
  },
  'sunday': {
    'breakfast': null,
    'lunch': null,
    'dinner': null
  },
};

function calendra(state = initialCalendraState, action) {

  const { type, day, recipe, meal } = action;

  switch (type) {

    case ADD_RECIPE:
      return {
        ...state,
        [day]: {
          ...state[day],
          [meal]: recipe.label
        }
      };

    case REMOVE_FROM_CALENDRA:
      return {
        ...state,
        [day]: {
          ...state[day],
          meal: null
        }
      };
    default: return state;
  }
}

export default calendra;