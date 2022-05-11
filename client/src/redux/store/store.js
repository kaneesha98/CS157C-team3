import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/users/usersSlices";
import expensesReduder from "../slices/expenses/expensesSlices"
import incomeReduder from "../slices/income/incomeSlices"
import account from "../slices/accountsStats/accountStatSlices";
//All contents are output on redux extension
const store = configureStore({
    reducer: {
        users: userReducer,
        expenses: expensesReduder,
        income: incomeReduder,
        account,
    }, 
});

export default store;