import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./slice/Auth";

export const { AUTH_LOGIN, AUTH_CHECK } =
authSlice.actions;

export const authReducer = authSlice.reducer;

const rootReducer = combineReducers({
    auth: authReducer,

})

export default rootReducer