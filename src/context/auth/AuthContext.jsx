/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
};
//
export const AuthContext = createContext(INITIAL_STATE);


const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN": {
            return {
                ...state,currentUser: action.payload,
            };
        }
        case "LOGOUT": {
            return {
                ...state,currentUser: null,
            };
        }
    }
}
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  
 
  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {
        children
      }
    </AuthContext.Provider>
  );
};

