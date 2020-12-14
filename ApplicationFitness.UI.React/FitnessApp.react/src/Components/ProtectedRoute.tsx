import React from 'react';

import {
    RouteProps,
    Redirect,
    Route
  } from "react-router-dom";

  import authService from '../services/authService';
  import {paths} from '../links/NavbarLinks';
  
  export default function ProtectedRoute(props:RouteProps){
      if(!authService.token())
      return <Redirect to={paths.SignIn} />
      return <Route {...props}/>
  }