import { createSlice } from "@reduxjs/toolkit";
import { IThreadCard } from "../../interface/Thread";

const initialThreadState: { threads: IThreadCard[] } = { threads: [] };

export const threadSlice = createSlice({
  name: "thread",
  initialState: initialThreadState,
  reducers: {
    GET_THREADS: (state, action) => {
      state.threads = action.payload;
    },
    SET_THREAD_LIKE: (
      state,
      action: { payload: { id: number; isLiked: boolean } }
    ) => {
      const { id, isLiked } = action.payload;

      state.threads = state.threads.map((thread) => {
        if (thread.id === id) {
          return {
            ...thread,
            likes_count: isLiked ? (thread.likesCount ?? 0) - 1 : (thread.likesCount ?? 0) + 1,
            is_liked: !isLiked,
          };
        }
        return thread;
      });
    },
  },
});