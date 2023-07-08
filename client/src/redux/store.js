import { configureStore } from '@reduxjs/toolkit';
import { navbarReducer } from './reducers/other';
import { employeeReducer } from './reducers/employee';

const store = configureStore({
  reducer : {
    navbar: navbarReducer,
    employee: employeeReducer
  }
});

export default store;