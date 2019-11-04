import React from 'react';
import './css/App.css';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import Start from './views/Start';
import Register from './views/Register';
import Navbar from './components/BottomNavbar';
import Login from './views/Login';
import Feed from './views/Feed';
import AfterRegister from './views/AfterRegister';
import { Store } from './utilities/Store'

function App() {
  const { state } = React.useContext(Store);
  console.log("logged in: ", state.isLoggedIn)

  return (
    <Router>
      <div className="App">
        { state.isLoggedIn ? 
          <Navbar /> : ''
        }
        <Route exact path="/" component={Feed} />
        <Route path="/start" component={Start} />
        <Route exact path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/register/questions" component={AfterRegister} />
      </div>
    </Router>
  );
}

export default App;
