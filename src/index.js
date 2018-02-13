import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers/index.js';
import App from './components/App';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(<App store={store} />, document.getElementById('root'));
registerServiceWorker();
