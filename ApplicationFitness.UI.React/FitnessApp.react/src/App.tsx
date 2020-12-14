import React, { useContext } from 'react';
import "react-toastify/dist/ReactToastify.css";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import PersistentDrawerLeft from './Components/NavBar';
import HomePage from './Components/HomePage';
import ProtectedRoute from './Components/ProtectedRoute';

import { navLinks, NavLinkProps } from './links/NavbarLinks';
import { ToastContainer } from 'react-toastify';
import UserContext from './Context/UserContext';
import { useState } from 'react';
import authService from './services/authService';
import UserResponse from './services/interfaces/UserResponse';

function App() {
  const [user, setUser] = useState(authService.getCurrentUser());
  const onLogin = (newUser:UserResponse) =>{
    setUser(newUser);
  }
  const onLogOut = () =>{
    setUser({} as UserResponse);
  }
  return (
    <UserContext.Provider value={{user:user, onLogin:onLogin, onLogOut:onLogOut}}>
    <Router>
      <div className="App">
        <PersistentDrawerLeft />
        <Switch>
          {navLinks.map((props) => (
            getComponent(props)
          ))}
          <HomePage />
        </Switch>
      </div>
      <ToastContainer />
    </Router>
    </UserContext.Provider>
  );
}

function getComponent(props: NavLinkProps) {
  const { path, componentx, title } = props;
  if (props.isProtected) {
    return <ProtectedRoute path={path} component={componentx} key={title} />
  }
  return <Route path={path} component={componentx} key={title} />;
}

export default App;
