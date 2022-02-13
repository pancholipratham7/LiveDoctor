import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const userAppointmentsInitialState = {
  myAppointments: [],
  loading: false,
  error: "",
};

// Creating slice
const userAppointmentsSlice = createSlice({
  name: "User appointments",
  initialState: userAppointmentsInitialState,
  reducers: {
    getAppointmentsRequest(state, action) {
      state.loading = true;
    },
    getAppointmentsSuccess(state, action) {
      state.myAppointments = action.payload;
      state.loading = false;
      state.error = "";
    },
    getAppointmentsFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// myappointment Reducers and my appointment Actions
export const userAppointmentsReducer = userAppointmentsSlice.reducer;
export const userAppointmentsActions = userAppointmentsSlice.actions;

// backend request for booked appointments
export const fetchUsersAppointments = (id) => async (dispatch, getState) => {
  try {
    // making the loading state as true
    dispatch(userAppointmentsActions.getAppointmentsRequest());

    // getting token
    const token = getState().user.userLoggedInDetails.token;

    // setting up the headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        doctor: "no",
      },
    };

    // making the request at the backend
    const { data } = await axios.get(
      `http://localhost:5000/api/users/${id}/appointments`,
      config
    );

    // updating the requested appointments
    dispatch(userAppointmentsActions.getAppointmentsSuccess(data));
  } catch (err) {
    // If any error occurs then adding the error in the redux state
    dispatch(
      userAppointmentsActions.getAppointmentsFailed(err.response.data.message)
    );
  }
};
