import { configureStore } from "@reduxjs/toolkit";
import { doctorDetailsReducer } from "./doctorDetailsSlice";
import { doctorsListReducer } from "./doctorsListSlice";
import { userReducer } from "./userSlice";

// central store for storing all states
const store = configureStore({
  reducer: {
    doctorsList: doctorsListReducer,
    user: userReducer,
    doctorDetails: doctorDetailsReducer,
  },
});

export default store;
