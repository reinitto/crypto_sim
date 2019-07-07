import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Home from './components/pages/Home';
import Navbar from './components/layout/Navbar';
import Alerts from './components/layout/Alerts';
import GameMenu from './components/layout/GameMenu';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './styles/App.css';

function App() {
  useEffect(() => {
    //Init Materialize JS
    M.AutoInit();
  });
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <div className='container'>
            <GameMenu />
            <Alerts />
            <Switch>
              <Route exact path='/' component={Home} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
