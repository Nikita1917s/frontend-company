import { combineReducers } from "@reduxjs/toolkit";
import usersSlice  from "@/slices/user";

const rootReducer = combineReducers({
  users: usersSlice,
});

export default rootReducer;
