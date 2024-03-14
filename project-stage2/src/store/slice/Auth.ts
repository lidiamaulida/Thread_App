import { Iuser } from "../../interface/Auth";
import { createSlice } from "@reduxjs/toolkit"
import { setAuthToken } from "../../libs/api";

const initialAuthState: Iuser = {
    id: 0,
    email: "",
    fullName: "",
    userName: "",
    profil_picture: "",
    profil_description: "",
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState, 
    reducers: {
        AUTH_LOGIN: (state, action) => {  
            setAuthToken(action.payload.token)
            localStorage.setItem("token", action.payload.token)

            const {
                id,
                email,
                fullName,
                userName,
                profil_description,
                profil_picture,
                followers_count,
                followings_count,
            } = action.payload.obj

           state.id = id;
           state.email = email;
           state.fullName = fullName;
           state.userName = userName;
           state.profil_description = profil_description;
           state.profil_picture = profil_picture;
           state.followers_count = followers_count;
           state.followings_count = followings_count;
        },
        AUTH_CHECK: (state, action) => {
            const {
                id,
                email,
                fullName,
                userName,
                profil_description,
                profil_picture,
                followers_count,
                followings_count,
              } = action.payload.user;

            state.id = id;
            state.email = email;
            state.fullName = fullName;
            state.userName = userName;
            state.profil_description = profil_description;
            state.profil_picture = profil_picture;
            state.followers_count = followers_count;
            state.followings_count = followings_count;
            
        },
        AUTH_ERROR: () => {
            localStorage.removeItem("token")
        },
        AUTH_LOGOUT: () => {
            localStorage.removeItem("token")
        }
    }
})