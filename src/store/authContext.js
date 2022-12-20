import React, { useCallback, useEffect, useState } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) =>{
  const currentTime = new Date().getTime();
  const  expireTime  =  new Date(expirationTime).getTime();
  return expireTime-currentTime;
}

const retrieveStoredToken = () => {
  const  storedToken  =  localStorage.getItem('token');
  const  storedExpirationDate  =  localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData= retrieveStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken  =  tokenData.token;
  }
  const [token, setToken] = useState(initialToken);

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    
    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  },[]);

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const authContextValue = {
    token: token,
    isLoggedIn: !!token,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;