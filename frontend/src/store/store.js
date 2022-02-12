import { configureStore } from "@reduxjs/toolkit";
import { doctorAppointmentsReducer } from "./doctorAppointmentsSlice";
import { doctorDetailsReducer } from "./doctorDetailsSlice";
import { doctorsListReducer } from "./doctorsListSlice";
import { userReducer } from "./userSlice";

// central store for storing all states
const store = configureStore({
  reducer: {
    doctorsList: doctorsListReducer,
    user: userReducer,
    doctorDetails: doctorDetailsReducer,
    appointments: doctorAppointmentsReducer,
  },
});

export default store;
