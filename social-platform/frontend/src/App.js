import React from 'react';
import './css/App.css';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Start from './views/Start';
import Feed from './views/Feed';
import Register from './views/Register';
import Login from './views/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Feed} />
        <Route path="/start" component={Start} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  );
}

export default App;
