import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const doctorAppointmentsInitialState = {
  bookedAppointments: {
    loading: false,
    error: "",
    appointments: [],
  },
  requestedAppointments: {
    loading: false,
    error: "",
    appointments: [],
  },
};

// Creating slice
const doctorAppointmentsSlice = createSlice({
  name: "Doctor appointments",
  initialState: doctorAppointmentsInitialState,
  reducers: {
    bookedAppointmentsRequest(state, action) {
      state.bookedAppointments.loading = true;
    },
    bookedAppointmentsSuccess(state, action) {
      state.bookedAppointments.appointments = action.payload;
      state.bookedAppointments.loading = false;
    },
    bookedAppointmentsFailed(state, action) {
      state.bookedAppointments.error = action.payload;
      state.bookedAppointments.loading = false;
    },
    requestedAppointmentsRequest(state, action) {
      state.requestedAppointments.loading = true;
    },
    requestedAppointmentsFailed(state, action) {
      state.requestedAppointments.error = action.payload;
      state.requestedAppointments.loading = false;
    },
    requestedAppointmentsSuccess(state, action) {
      state.requestedAppointments.appointments = action.payload;
      state.requestedAppointments.loading = false;
    },
  },
});

// myappointment Reducers and my appointment Actions
export const doctorAppointmentsReducer = doctorAppointmentsSlice.reducer;
export const doctorAppointmentsActions = doctorAppointmentsSlice.actions;

// backend request for booked appointments
export const fetchDoctorsRequestedAppointments =
  (id) => async (dispatch, getState) => {
    try {
      // making the loading state as true
      dispatch(doctorAppointmentsActions.requestedAppointmentsRequest());

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
        `http://localhost:5000/api/doctors/${id}/requested-appointments`,
        config
      );

      // updating the requested appointments
      dispatch(doctorAppointmentsActions.requestedAppointmentsSuccess(data));
    } catch (err) {
      // If any error occurs then adding the error in the redux state
      dispatch(
        doctorAppointmentsActions.requestedAppointmentsFailed(
          err.response.data.message
        )
      );
    }
  };

// backend request for requested appointments
export const fetchDoctorsBookedAppointments =
  (id) => async (dispatch, getState) => {
    try {
      // making the loading state as true
      dispatch(doctorAppointmentsActions.bookedAppointmentsRequest());

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
        `http://localhost:5000/api/doctors/${id}/booked-appointments`,
        config
      );

      // updating the requested appointments
      dispatch(doctorAppointmentsActions.bookedAppointmentsSuccess(data));
    } catch (err) {
      // If any error occurs then adding the error in the redux state
      dispatch(
        doctorAppointmentsActions.bookedAppointmentsFailed(
          err.response.data.message
        )
      );
    }
  };
