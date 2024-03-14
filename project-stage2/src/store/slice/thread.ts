import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IThreadCard, IThreadPost } from "../../interface/Thread";
import { API } from "../../libs/api";

interface Threadstate {
    threads : IThreadCard[],
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialThreadState: Threadstate = {
    threads: [],
    status: "idle",
    error: null,
}

export const createThreadAsync = createAsyncThunk(
    "thread/createThread",
    async (newThread: IThreadPost) => {
        const response = await API.post("/thread", newThread);
        console.log(response, "but make redux");
        
        return response.data.data;
    }
) 

export const threadSlice = createSlice({
    name: "thread",
    initialState: initialThreadState,
    reducers: {
        threadLoding: (state) => {
            state.status ="loading"
        },
        threadsReceived: (state, action: PayloadAction<IThreadCard[]>) => {
            state.status = "succeeded";
            state.threads = action.payload;
        },
        threadsError: (state, action: PayloadAction<string>) => {
            state.status = "failed";
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(createThreadAsync.pending, (state) => {
            state.status = "loading";
        })
        .addCase(createThreadAsync.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.threads.push(action.payload);
        })
        .addCase(createThreadAsync.rejected, (state, action) => {
            state.status = "failed"
            state.error = action.error.message ?? "Failed to create thread!"
        })
    }
})

export const { threadLoding, threadsReceived, threadsError } = threadSlice.actions;

export default threadSlice.reducer;