import React, { useState } from 'react';
import './css/App.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Start from './views/Start';
import Register from './views/Register';
import Navbar from './components/BottomNavbar';
import Login from './views/Login';
import Feed from './views/Feed';
import NewFeed from './views/NewFeed';
import Profile from './views/Profile';
import Swipe from './views/Swipe';
import Messages from './views/Messages';
import MyProfile from './views/MyProfile';
import PrivateRoute from './utilities/PrivateRoute'
import { Store } from './utilities/Store'
import Forum from './views/Forum'
import OnePost from './views/OnePost'
import EditProfile from './views/EditProfile';
import useLifeCycle from './utilities/useLifeCycle';
import FeedComments from './views/FeedComments';
import ReactNotifications from 'react-notifications-component';
import Adminpage from './views/Adminpage';
import { store } from 'react-notifications-component';
import Chat from './views/Chat';
import socket from './utilities/Socket'


socket.on('incoming-message', () => {
    updateStateWithNewProfile()
})

let updateStateWithNewProfile;

function App(props) {
    const { state, dispatch } = React.useContext(Store);
    const [loading, setLoading] = useState(true)

    useLifeCycle({
        mount: () => {
            checkLoginStatus()
            socket.on('show-notification', function (data) {
                store.addNotification({
                    title: '',
                    message: `${data.senderName} skickade ett nytt meddelande till dig`,
                    type: 'info',                         // 'default', 'success', 'info', 'warning'
                    container: 'top-center',                // where to position the notifications
                    animationIn: ["animated", "fadeIn"],     // animate.css classes that's applied
                    animationOut: ["animated", "fadeOut"],   // animate.css classes that's applied
                    dismiss: {
                        duration: 3000,
                        onScreen: false,
                    }
                })
            })
        }
    })

    updateStateWithNewProfile = async () => {
        let data = await fetch('/api/currentuser/' + state.currentUser.id)
        data = await data.json()
        dispatch({
            type: 'SET_CURRENT_USER',
            payload: data
        })
    }



    const checkCurrentUser = async (id) => {
        let data = await fetch('/api/currentuser/' + id)
        try {
            data = await data.json();
        } catch { }
        dispatch({
            type: 'SET_CURRENT_USER',
            payload: data
        })
        if (data.isAdmin) {
            dispatch({
                type: 'SET_Admin',
                payload: true
            })
        }

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
            socket.emit('login', { id: data.id })
            await checkCurrentUser(data.id)
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
                {state.isLoggedIn ?
                    <Navbar /> : ''
                }
                <div className="content-wrapper">
                    <PrivateRoute exact path="/" component={Feed} isAuthenticated={state.isLoggedIn} loading={loading} redirectPath="/start" />
                    <PrivateRoute exact path="/swipe" component={Swipe} isAuthenticated={state.isLoggedIn} loading={loading} redirectPath="/start" />
                    <PrivateRoute exact path="/profile" component={Profile} isAuthenticated={state.isLoggedIn} loading={loading} redirectPath="/start" />
                    <PrivateRoute exact path="/messages" component={Messages} isAuthenticated={state.isLoggedIn} loading={loading} redirectPath="/start" />
                    <PrivateRoute exact path="/myprofile" component={MyProfile} isAuthenticated={state.isLoggedIn} loading={loading} redirectPath="/start" />
                    <PrivateRoute exact path="/profile/:id" component={Profile} isAuthenticated={state.isLoggedIn} loading={loading} redirectPath="/start" />
                    <PrivateRoute exact path="/edit-profile" component={EditProfile} isAuthenticated={state.isLoggedIn} loading={loading} redirectPath="/start" />
                    <PrivateRoute exact path="/feed-post/:id" component={FeedComments} isAuthenticated={state.isLoggedIn} loading={loading} redirectPath="/start" />
                    <PrivateRoute exact path="/new-feed-post" component={NewFeed} isAuthenticated={state.isLoggedIn} loading={loading} redirectPath="/start" />
                    <PrivateRoute exact path="/chat/:id" component={Chat} isAuthenticated={state.isLoggedIn} loading={loading} redirectPath="/start" />
                    <PrivateRoute path="/start" component={Start} isAuthenticated={!state.isLoggedIn} loading={loading} redirectPath="/" />
                    <PrivateRoute path="/register" component={Register} isAuthenticated={!state.isLoggedIn} loading={loading} redirectPath="/" />
                    <PrivateRoute path="/login" component={Login} isAuthenticated={!state.isLoggedIn} loading={loading} redirectPath="/" />
                    <PrivateRoute path="/forum" component={Forum} isAuthenticated={state.isLoggedIn} loading={loading} redirectPath="/start" />
                    <PrivateRoute exact path="/onepost/:id" component={OnePost} isAuthenticated={state.isLoggedIn} loading={loading} redirectPath="/start" />
                    <PrivateRoute exact path="/adminpage" component={Adminpage} isAuthenticated={state.isLoggedIn} loading={loading} redirectPath="/start" />
                    <Link to={{
                        pathname: `/messages`, }}
                        style={{ textDecoration: 'none', color: 'whitesmoke' }}>
                        <ReactNotifications />
                    </Link>


                </div>
            </div>
        </Router>
    );
}

export default App;
