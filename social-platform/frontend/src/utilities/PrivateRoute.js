import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Loading from '../utilities/Loading'

const PrivateRoute = props => {

    const { component: Component, isAuthenticated, loading, redirectPath, ...rest } = props;
    
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
