import Login from '../sign-in';
import Signup from '../sign-up';
import Dashboard from '../dashboard';
import loginData from '../../data/signin.json';
import signupData from '../../data/signup.json';
import resetPasswordData from '../../data/resetPasswordData.json';
import Ledger from '../tasks';
import Departments from '../departments';
import Employees from '../employees';
import Plans from '../projects';
import ResetPassword from '../resetPassword';
import {
  Navigate
} from "react-router-dom";
import EmployeeDetails from '../employees/employeeDetails';
import employeeDetailsData from '../../data/employeeDetailsData.json';
import TimeSheets from '../time-sheets';
import Reports from '../reports';
import Settings from '../settings';
import Profile from '../profile';

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
    path: '/tasks',
    element: <Ledger/>
  },
  {
    path: '/departments',
    element: <Departments/>
  },
  {
    path: '/employees',
    element: <Employees/>
  },
  {
    path: '/employees/:id',
    element: <EmployeeDetails {...employeeDetailsData}/>
  },
  {
    path: '/projects',
    element: <Plans/>
  },
  {
    path: '/timesheets',
    element: <TimeSheets/>
  },
  {
    path: '/reports',
    element: <Reports/>
  },
  {
    path: '/settings',
    element: <Settings/>
  },
  {
    path: '/profile',
    element: <Profile/>
  },
  {
    path: '/*',
    element: <Navigate to="/" />
  }
];