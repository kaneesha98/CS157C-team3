import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlices";
import expensesReducer from "../slices/expenses/expensesSlices"
const store = configureStore({
    reducer: {
        users: usersReducer,
        expenses: expensesReducer,
    }, 
});

export default store;
