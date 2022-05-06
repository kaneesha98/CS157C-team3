import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
/* 
    Redux error handler
*/

// Login Action - Sending post request to server
export const loginUserAction = createAsyncThunk("user/login", async (payload,
    {rejectWithValue, getState, dispatch }) => {
        //Notify sever that only json data is sent
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            // make http call 
            const {data} = await axios.post(
                `${baseURL}/users/login`, 
                //Data in Json is sending to sever
                payload,
                //Data configuration
                config
            );

            //Save user data into local storage
            localStorage.setItem('userInfo', JSON.stringify(data));

            //Send data from server to users
            return data;
        } catch (error) {
            //No error and no error in the response
            if(!error?.response) {
                throw error;
            }
            //If there is error, return error with data
            return rejectWithValue(error?.response?.data);
        }
    });

//Logout action
export const logout = createAsyncThunk(
    "user/logout",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      try {
        //Save user into localstorage
        localStorage.removeItem("userInfo");
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );
  
// Register Action - Sending post request to server
export const registerUserAction = createAsyncThunk("user/register", async (payload,
    {rejectWithValue, getState, dispatch }) => {
        //Notify sever that only json data is sent
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            // make http call 
            const {data} = await axios.post(
                `${baseURL}/users/register`, 
                //Data in Json is sending to sever
                payload,
                //Data configuration
                config
            );
            //Send data from server to users
            return data;
        } catch (error) {
            //No error and no error in the response
            if(!error?.response) {
                throw error;
            }
            //If there is error, return error with data
            return rejectWithValue(error?.response?.data);
        }
    });



// slices
//Get user data from local storage and place inside the store/redux state
const userLoginFromStorage = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo'))
    : undefined;

const usersSlices = createSlice({
    name: 'users',
    initialState: {
        userLoginFromStorage
    },
    //Determine how the state has changed
    extraReducers: (builder) => {
        //Login
        // Handle pending state
        builder.addCase(loginUserAction.pending, (state, action) => {
            state.userLoading = true;
            //App Error
            state.userAppErr = undefined;
            //Server Error
            state.userServerErr = undefined;
        });

        // Handle Success/Fulfilled state
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.userAuth = action?.payload;
            state.userLoading = true;
            state.userAppErr = undefined;
            state.userServerErr = undefined;
        });

        // Handle Rejected state
        builder.addCase(loginUserAction.rejected, (state, action) => {
            state.userLoading = false;
            state.userAppErr = action?.payload?.msg;
            state.userServerErr = action?.error?.msg;
        });

        //Registration
        // Handle pending state
        builder.addCase(registerUserAction.pending, (state, action) => {
            state.userLoading = true;
            //App Error
            state.userAppErr = undefined;
            //Server Error
            state.userServerErr = undefined;
        });

        // Handle Success/Fulfilled state
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.userAuth = action?.payload;
            state.userLoading = true;
            state.userAppErr = undefined;
            state.userServerErr = undefined;
        });

        // Handle Rejected state
        builder.addCase(registerUserAction.rejected, (state, action) => {
            state.userLoading = false;
            state.userAppErr = action?.payload?.msg;
            state.userServerErr = action?.error?.msg;
        });
    }
});


export default usersSlices.reducer;
