import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./slice/Auth";
import { followSlice } from "./slice/Follows";
import { threadSlice } from "./slice/Thread2";

export const { AUTH_LOGIN, AUTH_CHECK, AUTH_LOGOUT } = authSlice.actions;
export const { GET_THREADS, SET_THREAD_LIKE } = threadSlice.actions;
export const { GET_FOLLOWS, SET_FOLLOW_STATE, SET_FOLLOW } = followSlice.actions;

export const authReducer = authSlice.reducer;
export const thradReducer = threadSlice.reducer
export const followsReducer = followSlice.reducer;

const rootReducer = combineReducers({
    auth: authReducer,
    thread: thradReducer,
    follows: followsReducer,
})

export default rootReducer