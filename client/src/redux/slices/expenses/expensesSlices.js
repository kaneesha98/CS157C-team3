import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { useNavigate } from "react-router-dom";
import { userProfileAction } from "../users/usersSlices";
import { useEffect } from "react";


//Create action
export const createExpAction = createAsyncThunk(
  "expense/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //get user token from store
    const userToken = getState()?.users?.userAuth?.token;
    const config = {
      //Pass authorization header use 'Bearer' as key and user token that is already retrieved
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };
    try {
      //make http call here
      const { data } = await axios.post(`${baseURL}/expenses`, payload, config);
      dispatch(fetchAllExpenseAction);
      dispatch(userProfileAction);  
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);
  
//Update action
export const updateExpAction = createAsyncThunk(
    "expense/update",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      //get user token from store
      const userToken = getState()?.users?.userAuth?.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      try {
        //make http call here
        const { data } = await axios.put(
          `${baseURL}/expenses/${payload?.id}`,
          payload,
          config
        );
        dispatch(fetchAllExpenseAction);
        dispatch(userProfileAction);  
        return data;
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
);  
//fetch all expenses
export const fetchAllExpenseAction = createAsyncThunk(
  "expense/fetch-all",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users?.userAuth;
    const config = {
      headers: {
        authorization: `Bearer ${user?.token}`,
      },
    };
    try {
    //Make http call
      const { data } = await axios.get(
        `${baseURL}/expenses?page=${payload}`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Delete action
export const deleteExpAction = createAsyncThunk(
  "expense/delete",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //get user token from store
    const userToken = getState()?.users?.userAuth?.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    };
    try {
      //make http call here
      const { data } = await axios.delete(
        `${baseURL}/expenses/${payload?.id}`,
        config
      );
      dispatch(fetchAllExpenseAction);
      dispatch(userProfileAction);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    } finally {
      
    }
  }
);  
//slices

const expenseSlices = createSlice({
  name: "expenses",
  initialState: {},
  extraReducers: (builder) => {
    //   Create Expense
    builder.addCase(createExpAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createExpAction.fulfilled, (state, action) => {
        state.loading = false;
        state.expenseCreated = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
    });
    builder.addCase(createExpAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.msg;
        state.serverErr = action?.error?.msg;
    });  
    //   fetch all Expense
    builder.addCase(fetchAllExpenseAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllExpenseAction.fulfilled, (state, action) => {
      state.loading = false;
      state.expensesList = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchAllExpenseAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });

    //Update all Expense
    builder.addCase(updateExpAction.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(updateExpAction.fulfilled, (state, action) => {
        state.loading = false;
        state.expenseUpdated = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(updateExpAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.msg;
        state.serverErr = action?.error?.msg;
      });

      //Delete an expense
      builder.addCase(deleteExpAction.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(deleteExpAction.fulfilled, (state, action) => {
        state.loading = false;
        state.expenseDeleted = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(deleteExpAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.msg;
        state.serverErr = action?.error?.msg;
      });

    },
});

export default expenseSlices.reducer;