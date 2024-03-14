import { useDispatch } from "react-redux";
import { API } from "../../../libs/api";
import { GET_THREADS } from "../../../store/RootReducer";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/types/RootTypes";

export function useThreadUser() {
    const dispatch = useDispatch();
    const threads = useSelector((state: RootState) => state.thread.threads);
    // const token = localStorage.getItem("token") + ""
  
    async function getThreads() {
      const response = await API.get(`/threadUser?limit=100`);
      dispatch(GET_THREADS(response.data));
    }

    useEffect(() => {
        getThreads();
    }, []);

    return { getThreads, threads }
}