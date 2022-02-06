import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const patientAppointmentsInitialState = {
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
const patientAppointmentsSlice = createSlice({
  name: "Patient appointments",
  initialState: patientAppointmentsInitialState,
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
export const patientAppointmentsReducer = patientAppointmentsSlice.reducer;
export const patientAppointmentsActions = patientAppointmentsSlice.actions;

// backend request for booked appointments
export const fetchPatientRequestedAppointments =
  (id) => async (dispatch, getState) => {
    try {
      // making the loading state as true
      dispatch(patientAppointmentsActions.requestedAppointmentsRequest());

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
        `http://localhost:5000/api/users/${id}/requested-appointments`,
        config
      );

      // updating the requested appointments
      dispatch(patientAppointmentsActions.requestedAppointmentsSuccess(data));
    } catch (err) {
      // If any error occurs then adding the error in the redux state
      dispatch(
        patientAppointmentsActions.requestedAppointmentsFailed(
          err.response.data.message
        )
      );
    }
  };

// backend request for requested appointments
export const fetchPatientBookedAppointments =
  (id) => async (dispatch, getState) => {
    try {
      // making the loading state as true
      dispatch(patientAppointmentsActions.bookedAppointmentsRequest());

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
        `http://localhost:5000/api/users/${id}/booked-appointments`,
        config
      );

      // updating the requested appointments
      dispatch(patientAppointmentsActions.bookedAppointmentsSuccess(data));
    } catch (err) {
      // If any error occurs then adding the error in the redux state
      dispatch(
        patientAppointmentsActions.bookedAppointmentsFailed(
          err.response.data.message
        )
      );
    }
  };
