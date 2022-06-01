import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import dotenv from 'dotenv'
import axios from 'axios';
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_APIFOOD || 'http://localhost:3001';


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

