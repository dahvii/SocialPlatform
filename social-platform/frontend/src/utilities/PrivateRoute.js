import React, { useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import useLifeCycle from '../utilities/useLifeCycle';
import { Store } from '../utilities/Store';
import Loading from '../utilities/Loading'

const PrivateRoute = props => {

    const { component: Component, isAuthenticated, redirectPath, ...rest } = props;
    const { state, dispatch } = React.useContext(Store);
    const [loading, setLoading] = useState(true)

    useLifeCycle({
        mount: () => checkLoginStatus()
    })

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
                type: 'SET_CURRENT_USER',
                payload: data
            })
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
        <Route
            {...rest}
            render={props =>
                loading ? (
                    <Loading />
                ) : (
                        isAuthenticated ? (
                            <Component {...props} />
                        ) : (
                                <Redirect
                                    to={{
                                        pathname: redirectPath

                                    }}
                                />
                            )
                    )
            }
        />
    )
}

export default PrivateRoute;
