import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

//fetch account statistic action
export const fetchAccountStatsAction = createAsyncThunk(
  "account/fetch",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const user = getState()?.users?.userAuth;
    const config = {
      headers: {
        authorization: `Bearer ${user?.token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${baseURL}/accounts-statistics`,
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
const accountStatsSlices = createSlice({
    name: "account",
    initialState: {},
    extraReducers: builder => {
      //fetch account statistics
      builder.addCase(fetchAccountStatsAction.pending, (state, action) => {
        state.loading = true;
      });
      builder.addCase(fetchAccountStatsAction.fulfilled, (state, action) => {
        state.loading = false;
        state.accountDetails = action?.payload;
        state.appErr = undefined;
        state.serverErr = undefined;
      });
      builder.addCase(fetchAccountStatsAction.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.msg;
        state.serverErr = action?.error?.msg;
      });
    },
  });
  
  export default accountStatsSlices.reducer;