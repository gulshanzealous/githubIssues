import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Route, IndexRoute, Router,  browserHistory } from 'react-router'
import { Home } from './Components'

const AllRoutes = (
    <Router history = {browserHistory}>
        <Route path = '/' component = {App}>
              <IndexRoute component = {Home} /> 
        </Route>
    </Router>
)

ReactDOM.render(AllRoutes, document.getElementById('root'));
