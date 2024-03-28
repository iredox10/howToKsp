import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { state: action.payload };
    case "LOGOUT":
      return { state: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  console.log("authcontext:", state);
  const user = JSON.parse(localStorage.getItem('howtokspUSER'))
  console.log(user);
    useEffect(() =>{
        if(user){
            dispatch({type: 'LOGIN', payload:user })
        }
    },[])
  return (
    <AuthContext.Provider value={{...state,dispatch}}>
        {children}
    </AuthContext.Provider>
  );
};
