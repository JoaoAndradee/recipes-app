import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Provider from './context/Provider';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Switch>
          <Route exact path="/" component={ Login } />
        </Switch>
      </Provider>
    </BrowserRouter>

  );
}

export default App;
