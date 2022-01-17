import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// doctors list initial state
const doctorsListInitialState = { doctors: [], loading: false, error: "" };

// creating slice
const doctorsListSlice = createSlice({
  initialState: doctorsListInitialState,
  name: "Doctors List",
  reducers: {
    requestDoctorsList(state, action) {
      state.loading = true;
    },
    doctorsListSuccess(state, action) {
      state.doctors = action.payload;
      state.loading = false;
    },
    doctorsListFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// userReducers and userActions
export const doctorsListReducer = doctorsListSlice.reducer;
export const doctorsListActions = doctorsListSlice.actions;

// custom action creator for getting the doctorsList
export const getDoctorsList = () => async (dispatch, getState) => {
  try {
    // loading the spinner before the doctors list are fetched
    dispatch(doctorsListActions.requestDoctorsList());

    // making request to the backend for getting the doctors list
    const { data } = await axios.get("http://localhost:5000/api/doctors");
    // updating the redux state
    dispatch(doctorsListActions.doctorsListSuccess(data));
  } catch (err) {
    console.log(err.message);
    dispatch(doctorsListActions.doctorsListFailed(err.response.data.message));
  }
};
