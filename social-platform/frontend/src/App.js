import React from 'react'
import './css/App.css';
import {BrowserRouter as Router } from 'react-router-dom';
import Start from './views/Start';
import Register from './views/Register';
import Navbar from './components/BottomNavbar';
import Login from './views/Login';
import Feed from './views/Feed';
import Profile from './views/Profile';
import Swipe from './views/Swipe';
import Messages from './views/Messages';
import MyProfile from './views/MyProfile';
import PrivateRoute from './utilities/PrivateRoute'
import { Store } from './utilities/Store'
import EditProfile from './views/EditProfile';

function App() {
  const { state } = React.useContext(Store);

  return (
    <Router>
      <div className="App">
        { state.isLoggedIn ? 
          <Navbar /> : ''
        }
        <PrivateRoute exact path="/" component={Feed} isAuthenticated={state.isLoggedIn} redirectPath="/start"/>
        <PrivateRoute exact path="/swipe" component={Swipe} isAuthenticated={state.isLoggedIn} redirectPath="/start"/>
        <PrivateRoute exact path="/profile" component={Profile} isAuthenticated={state.isLoggedIn} redirectPath="/start"/>
        <PrivateRoute exact path="/messages" component={Messages} isAuthenticated={state.isLoggedIn} redirectPath="/start"/>
        <PrivateRoute exact path="/myprofile" component={MyProfile} isAuthenticated={state.isLoggedIn} redirectPath="/start"/>
        <PrivateRoute exact path="/profile/:id" component={Profile} isAuthenticated={state.isLoggedIn} redirectPath="/start" />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} isAuthenticated={state.isLoggedIn} redirectPath="/start" />
        <PrivateRoute path="/start" component={Start} isAuthenticated={!state.isLoggedIn} redirectPath="/"/>
        <PrivateRoute path="/register" component={Register} isAuthenticated={!state.isLoggedIn} redirectPath="/"/>
        <PrivateRoute path="/login" component={Login} isAuthenticated={!state.isLoggedIn} redirectPath="/"/>
      </div>
    </Router>
  );
}

export default App;
