import React, { useEffect, useState } from 'react';
import Style from './ProtectedRoute.module.css';
import { Navigate } from 'react-router-dom';




export default function ProtectedRoute(props) {

  // Checks if user is authenticated via localStorage, redirects to login if not, otherwise renders child components.
  if (localStorage.getItem('userToken')) {
  return props.children
}else {
  return <Navigate to={'/login'}/>
}
}
