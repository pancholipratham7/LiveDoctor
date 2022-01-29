import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Doctor details initial state
const doctorDetailsInitialState = {
  doctorInfo: "",
  loading: false,
  error: "",
};

// creating slice
const doctorDetailsSlice = createSlice({
  initialState: doctorDetailsInitialState,
  name: "Doctor Details",
  reducers: {
    doctorDetailsRequest(state, action) {
      state.loading = true;
    },
    doctorDetailsSuccess(state, action) {
      state.loading = false;
      state.doctorInfo = action.payload;
    },
    doctorDetailsFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Reducers ana action
export const doctorDetailsReducer = doctorDetailsSlice.reducer;
export const doctorDetailsActions = doctorDetailsSlice.actions;

// custom action creator to fetch doctor details
export const fetchDoctorDetails = (id) => async (dispatch, getState) => {
  try {
    // loading =true;
    dispatch(doctorDetailsActions.doctorDetailsRequest());

    // making the request at the backend
    const { data } = await axios.get(
      `http://localhost:5000/api/doctors/${id}/details`
    );

    // updating the redux state
    dispatch(doctorDetailsActions.doctorDetailsSuccess(data));
  } catch (err) {
    dispatch(
      doctorDetailsActions.doctorDetailsFailed(err.response.data.message)
    );
  }
};
