import React from 'react';

export const Store = React.createContext();

const initialState = {
    isLoggedIn: false,
    test: 'Detta är från store'
}

function reducer(state, action){
    switch(action.type) {
        case 'TEST':
            return {...state, test: action.payload};
        default:
            return state;
    }
}

export function StoreProvider(props){
    const [state, dispatch] =React.useReducer(reducer, initialState);
    const value = {state, dispatch};
    return <Store.Provider value={value}>{props.children}
    </Store.Provider>
}