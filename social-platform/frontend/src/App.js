import React, { useState } from 'react';
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
import useLifeCycle from './utilities/useLifeCycle';

function App() {
  const { state, dispatch } = React.useContext(Store);
  const [loading, setLoading] = useState(true)

  useLifeCycle({
    mount: () => {
        checkLoginStatus()
    }
})

const checkCurrentUser = async (id) => {
    console.log("HEJHEJ")
    let data = await fetch('/api/person/' + id)
    try {
        data = await data.json();
    } catch { }

    dispatch({
        type: 'SET_CURRENT_USER',
        payload: data
    })
}

const checkLoginStatus = async () => {
    let data = await fetch("/api/loggedinas");
    try {
        data = await data.json();
    } catch {
    }
    if (data.loggedIn && state.isLoggedIn === false) {
        dispatch({
            type: 'SET_LOGGEDIN',
            payload: true
        })
        dispatch({
            type: 'SET_CURRENT_SESSION',
            payload: data
        })
        checkCurrentUser(data.id)
        setLoading(false)
    } else if (!data.loggedIn && state.isLoggedIn === true) {
        dispatch({
            type: 'LOGOUT_USER'
        })
        setLoading(false)
    } else if (data.loggedIn && state.isLoggedIn) {
        setLoading(false)
    }
    setLoading(false)
}


  return (
    <Router>
      <div className="App">
        { state.isLoggedIn ? 
          <Navbar /> : ''
        }
        <PrivateRoute exact path="/" component={Feed} isAuthenticated={state.isLoggedIn} loading={loading} redirectPath="/start"/>
        <PrivateRoute exact path="/swipe" component={Swipe} isAuthenticated={state.isLoggedIn} loading={loading} redirectPath="/start"/>
        <PrivateRoute exact path="/profile" component={Profile} isAuthenticated={state.isLoggedIn} loading={loading} redirectPath="/start"/>
        <PrivateRoute exact path="/messages" component={Messages} isAuthenticated={state.isLoggedIn} loading={loading} redirectPath="/start"/>
        <PrivateRoute exact path="/myprofile" component={MyProfile} isAuthenticated={state.isLoggedIn} loading={loading} redirectPath="/start"/>
        <PrivateRoute exact path="/profile/:id" component={Profile} isAuthenticated={state.isLoggedIn} loading={loading} redirectPath="/start" />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} isAuthenticated={state.isLoggedIn} loading={loading} redirectPath="/start" />
        <PrivateRoute path="/start" component={Start} isAuthenticated={!state.isLoggedIn} loading={loading} redirectPath="/"/>
        <PrivateRoute path="/register" component={Register} isAuthenticated={!state.isLoggedIn} loading={loading} redirectPath="/"/>
        <PrivateRoute path="/login" component={Login} isAuthenticated={!state.isLoggedIn} loading={loading} redirectPath="/"/>
      </div>
    </Router>
  );
}

export default App;
