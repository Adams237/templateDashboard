import React from 'react'
import { useSelector } from 'react-redux'
import { UserInterface } from '../../utils/interfaces/user.interface';
import { Navigate, Outlet } from 'react-router-dom';

interface RootState {
  user: {
    value: UserInterface[];
  };
}

function PivateRoute() {
    const currentUser = useSelector((state: RootState) => state.user.value[0]);
    console.log(currentUser)
  return currentUser? <Outlet/>:<Navigate to={"/login"} replace/>
}

export default PivateRoute