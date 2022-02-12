import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const doctorAppointmentsInitialState = {
  myAppointments: [],
  loading: false,
  error: "",
};

// Creating slice
const doctorAppointmentsSlice = createSlice({
  name: "Doctor appointments",
  initialState: doctorAppointmentsInitialState,
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
export const doctorAppointmentsReducer = doctorAppointmentsSlice.reducer;
export const doctorAppointmentsActions = doctorAppointmentsSlice.actions;

// backend request for booked appointments
export const fetchDoctorsAppointments = (id) => async (dispatch, getState) => {
  try {
    // making the loading state as true
    dispatch(doctorAppointmentsActions.getAppointmentsRequest());

    // getting token
    const token = getState().user.userLoggedInDetails.token;

    // setting up the headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // making the request at the backend
    const { data } = await axios.get(
      `http://localhost:5000/api/doctors/${id}/appointments`,
      config
    );

    // updating the requested appointments
    dispatch(doctorAppointmentsActions.getAppointmentsSuccess(data));
  } catch (err) {
    // If any error occurs then adding the error in the redux state
    dispatch(
      doctorAppointmentsActions.getAppointmentsFailed(err.response.data.message)
    );
  }
};
