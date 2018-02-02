import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import './styles';

import Shell from './App/Shell';

axios.defaults.baseURL = 'http://52.24.167.100';

ReactDOM.render(
  <Router>
    <Shell />
  </Router>,
  document.getElementById('root'),
);