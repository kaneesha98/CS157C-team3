import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";


// Login Action - Sending post request to server
export const loginUserAction = createAsyncThunk("user/login", async (payload,
    //rejectWithValue - Error message catch in the response from backend route
    {rejectWithValue, getState, dispatch }) => {
        //Notify sever that only json data is sent
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            // make http call, data is returned from server response 
            const {data} = await axios.post(
                `${baseURL}/users/login`, 
                //Data from frontend in Json format is sending to sever
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

//profile
export const userProfileAction = createAsyncThunk(
    "user/profile",
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
        const { data } = await axios.get(`${baseURL}/users/profile`, config);
        return data;
      } catch (error) {
        if (!error?.response) {
          throw error;
        }
        return rejectWithValue(error?.response?.data);
      }
    }
  );

//update
export const updateProfileAction = createAsyncThunk(
    "user/update",
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
          `${baseURL}/users/update`,
          {
            firstname: payload?.firstname,
            lastname: payload?.lastname,
            email: payload?.email,
          },
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


//get user from local storage and put it in initial state so that it can hold user's authorization
const userLoginFromStorage = localStorage.getItem('userInfo') 
? JSON.parse(localStorage.getItem('userInfo')) 
: undefined;
//Creating slices or Reducers to receive Actions
const usersSlices = createSlice({
    name: 'users',
    initialState: {
        userAuth: userLoginFromStorage
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
            //Load data onto redux state
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

        // Logout
        builder.addCase(logout.fulfilled, (state, action) => {
        state.userAuth = undefined;
        state.userLoading = false;
        state.expenses = undefined;
        state.income = undefined;
        state.account = undefined;
        });

        //Profile
        builder.addCase(userProfileAction.pending, (state, action) => {
        state.loading = true;
        state.AppErr = undefined;
        state.ServerErr = undefined;
        });
        //handle success state
        builder.addCase(userProfileAction.fulfilled, (state, action) => {
            state.profile = action?.payload;
            state.loading = false;
            state.AppErr = undefined;
            state.ServerErr = undefined;
        });
        //handle rejected state
        builder.addCase(userProfileAction.rejected, (state, action) => {
            state.loading = false;
            state.AppErr = action?.payload?.msg;
            state.ServerErr = action?.error?.msg;
        });
  
        //update
        builder.addCase(updateProfileAction.pending, (state, action) => {
            state.loading = true;
            state.AppErr = undefined;
            state.ServerErr = undefined;
        });
        //handle success state
        builder.addCase(updateProfileAction.fulfilled, (state, action) => {
            state.userUpdate = action?.payload;
            state.isEdited = true;
            state.loading = false;
            state.AppErr = undefined;
            state.ServerErr = undefined;
        });
        //handle rejected state
        builder.addCase(updateProfileAction.rejected, (state, action) => {
            state.loading = false;
            state.AppErr = action?.payload?.msg;
            state.ServerErr = action?.error?.msg;
        });
    }
});


export default usersSlices.reducer;
