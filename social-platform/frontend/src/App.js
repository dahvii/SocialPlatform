import React from 'react';
import './css/App.css';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './views/Login';
import Feed from './components/Feed';
import Forum from './views/Forum';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Feed} />
        <Route path="/login" component={Login} />
        <Route path="/Forum" component={Forum} />
      </div>
    </Router>
  );
}

export default App;
