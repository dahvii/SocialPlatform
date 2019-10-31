import React from 'react';
import './css/App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/BottomNavbar';
import Login from './views/Login';
import Feed from './components/Feed';
import { Store } from './utilities/Store'

function App() {
  const { state } = React.useContext(Store);
  console.log(state.isLoggedIn)

  return (
    <Router>
      <div className="App">
        { state.isLoggedIn ? 
          <Navbar /> : ''
        }
        <Route exact path="/" component={Feed} />
        <Route path="/login" component={Login} />
      </div>
    </Router>
  );
}

export default App;
