import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// user loggedin details from localStorahe
const userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"));

// user initial state
const userInitialState = {
  userLoggedInDetails: userLoggedIn,
  loading: false,
  error: "",
};

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
    userLogInRequest(state, action) {
      state.loading = true;
    },
    userLogInSuccess(state, action) {
      state.loading = false;
      state.userLoggedInDetails = action.payload;
    },
    userLogInFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    userLogout(state, action) {
      state.loading = false;
      state.error = "";
      state.userLoggedInDetails = "";
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

// userLogin request

export const loginUser = (user) => async (dispatch, getState) => {
  try {
    // making the loading state as true
    dispatch(userActions.userLogInRequest());

    // making a login request at the backend
    const { data } = await axios.post(
      "http://localhost:5000/api/users/login",
      user
    );
    console.log(data);

    // updating the redux state
    dispatch(userActions.userLogInSuccess(data));

    // storing the login details in the local storage
    localStorage.setItem("userLoggedIn", JSON.stringify(data));
  } catch (err) {
    console.log(err.response.data.message);
    dispatch(userActions.userLogInFailed(err.response.data.message));
  }
};

// action creator for logging out users
export const logoutUser = () => async (dispatch, getState) => {
  // changing redux state
  dispatch(userActions.userLogout());

  // removing the data from the local storage
  localStorage.removeItem("userLoggedIn");
};
