import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Settings from './pages/Settings';

import Ranking from './pages/Ranking';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/gameplay" component={ Game } />
        <Route exact path="/settings" component={ Settings } />

        <Route exact path="/ranking" component={ Ranking } />
      </Switch>
    );
  }
}

export default App;
