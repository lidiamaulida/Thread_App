import { createSlice } from "@reduxjs/toolkit";
import { IFollows } from "../../interface/Follow";

const initialFollowState: { followState: string; follows: IFollows[] } = {
    followState: "followers",
    follows: [],
};

export const followSlice = createSlice ({
    name: "follows",
    initialState: initialFollowState,
    reducers: {
        GET_FOLLOWS: ( state, action ) => {
            state.follows = action.payload
        },
        SET_FOLLOW_STATE: ( state, action ) => {
            state.followState = action.payload
        },
        SET_FOLLOW: ( 
            state, 
            action: { payload: { id: number; isFollowed: boolean } }
         ) => {
            const { id, isFollowed } = action.payload;

            state.follows = state.follows.map((follow) => {
                if (follow.id === id) {
                    return { ...follow, is_followed: !isFollowed };
                  }
                return follow;
            })
         }
    }
})