import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import type { UserInterface } from '../../utils/redux/slice/user.interface';

interface RootState {
  user: {
    value: UserInterface[];
  };
}

function PivateRoute() {
    const currentUser = useSelector((state: RootState) => state.user.value[0]);
  return currentUser? <Outlet/>:<Navigate to={"/login"} replace/>
}

export default PivateRoute