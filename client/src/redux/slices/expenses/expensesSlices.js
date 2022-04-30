import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";


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
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchAllExpAction = createAsyncThunk(
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
  
//Create action
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
        return data;
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
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
        state.expensesList = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
    });
    builder.addCase(createExpAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.msg;
        state.serverErr = action?.error?.msg;
    });  
    //   fetch all Expense
    builder.addCase(fetchAllExpAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchAllExpAction.fulfilled, (state, action) => {
      state.loading = false;
      state.expensesList = action?.payload;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchAllExpAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.msg;
      state.serverErr = action?.error?.msg;
    });

    //   fetch all Expense
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
    },
});

export default expenseSlices.reducer;