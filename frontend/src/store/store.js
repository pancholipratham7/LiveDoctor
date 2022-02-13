import { configureStore } from "@reduxjs/toolkit";
import { doctorAppointmentsReducer } from "./doctorAppointmentsSlice";
import { doctorDetailsReducer } from "./doctorDetailsSlice";
import { doctorsListReducer } from "./doctorsListSlice";
import { userAppointmentsReducer } from "./userAppointmentSlice";
import { userReducer } from "./userSlice";

// central store for storing all states
const store = configureStore({
  reducer: {
    doctorsList: doctorsListReducer,
    user: userReducer,
    doctorDetails: doctorDetailsReducer,
    doctorAppointments: doctorAppointmentsReducer,
    userAppointments: userAppointmentsReducer,
  },
});

export default store;
