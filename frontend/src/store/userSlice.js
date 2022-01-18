import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// user initial state
const userInitialState = { userLoggedInDetails: "", loading: false, error: "" };

// userSlice
const userSlice = createSlice({
  name: "User Slice",
  initialState: userInitialState,
  reducers: {
    userSignUpRequest(state, action) {
      state.loading = true;
    },
    userSignUpSuccess(state, action) {
      state.userLoggedInDetails = action.payload;
      state.loading = false;
    },
    userSignUpFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// user reducers and actions
export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;

// userSign up request
export const signUp = (user) => async (dispatch, getState) => {
  try {
    // making the loading state=true
    dispatch(userActions.userSignUpRequest());

    // making the request at the backend for signing up user
    const { data } = await axios.post(
      "http://localhost:5000/api/users/signUp",
      user
    );

    console.log(data);
    // user signUp successfully done
    dispatch(userActions.userSignUpSuccess(data));
  } catch (err) {
    dispatch(userActions.userSignUpFailed(err.response.data.message));
  }
};
