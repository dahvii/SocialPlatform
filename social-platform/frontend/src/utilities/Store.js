import React from 'react';

export const Store = React.createContext();

const initialState = {
    image: '',
    isLoggedIn: false,
    currentUser: '',
    currentSession: '',
    showQuestion: false,
    isAdmin: false
}

function reducer(state, action) {
    switch (action.type) {
        case 'TEST':
            return { ...state, image: action.payload };
        case 'SET_LOGGEDIN':
            return { ...state, isLoggedIn: action.payload };
        case 'SET_CURRENT_SESSION':
            return { ...state, currentSession: action.payload };
        case 'SET_CURRENT_USER':
            return { ...state, currentUser: action.payload };
        case 'LOGOUT_USER':
            return { ...state, currentUser: '', isLoggedIn: false }
        case 'SHOW_QUESTION': 
            return {...state, showQuestion: action.payload}
        case 'SET_Admin':
            return {...state, isAdmin: action.payload}
        default:
            return state;
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children}
    </Store.Provider>
}