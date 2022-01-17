import { configureStore } from "@reduxjs/toolkit";
import { doctorsListReducer } from "./doctorsListSlice";

// central store for storing all states
const store = configureStore({
  reducer: {
    doctorsList: doctorsListReducer,
  },
});

export default store;
