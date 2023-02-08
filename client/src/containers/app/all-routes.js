import Login from '../sign-in';
import Signup from '../sign-up';
import Dashboard from '../dashboard';
import loginData from '../../data/signin.json';
import signupData from '../../data/signup.json';
import resetPasswordData from '../../data/resetPasswordData.json';
import Ledger from '../ledger';
import Investments from '../investments';
import Users from '../users';
import Plans from '../plans';
import ResetPassword from '../resetPassword';
import {
  Navigate
} from "react-router-dom";
import UserDetails from '../users/userDetails';
import userDetailsData from '../../data/userDetailsData.json';

export const allRoutes = [
  {
    path: '/login',
    element: <Login {...loginData} />
  },
  {
    path: '/signup',
    element: <Signup {...signupData} />
  },
  {
    path: '/reset-password',
    element: <ResetPassword {...resetPasswordData} />
  },
  {
    path: '/',
    element: <Dashboard/>
  },
  {
    path: '/ledger',
    element: <Ledger/>
  },
  {
    path: '/investments',
    element: <Investments/>
  },
  {
    path: '/users',
    element: <Users/>
  },
  {
    path: '/users/:id',
    element: <UserDetails {...userDetailsData}/>
  },
  {
    path: '/plans',
    element: <Plans/>
  },
  {
    path: '/*',
    element: <Navigate to="/" />
  }
];