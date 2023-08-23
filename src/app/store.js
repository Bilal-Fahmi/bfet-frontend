import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slice/UserSlice";
import meetReducer from "../Slice/MeetSlice"

export default configureStore({
  reducer: {
    user: userReducer,
    meet: meetReducer
  },
});
