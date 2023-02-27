import { createContext, useContext, useReducer } from 'react';

export const StateContex = createContext();

export const StateProvider = ({ children, initialState, reducer }) => (
  <StateContex.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContex.Provider>
);

export const useStateProvider = () => useContext(StateContex);
