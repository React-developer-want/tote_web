import { configureStore } from '@reduxjs/toolkit';
import { navbarReducer } from './reducers/other';
import { employeeReducer } from './reducers/employee';
import { boardReducer } from './reducers/board';

const store = configureStore({
  reducer : {
    navbar: navbarReducer,
    employee: employeeReducer,
    boards: boardReducer
  }
});

export default store;