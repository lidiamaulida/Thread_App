import { API } from "../../../libs/api";
import { SET_THREAD_LIKE } from "../../../store/RootReducer";
import { RootState } from "../../../store/types/RootTypes";
import { useDispatch, useSelector } from "react-redux";

export function useThreadCard() {
  const dispatch = useDispatch();
  const threads = useSelector((state: RootState) => state.thread.threads);

  async function handlePostLike(id: number, isLiked: boolean) {
    try {
      if (isLiked) {
        const response = await API.delete(`/unlike/${id}`, );
        console.log("berhasil delete like", response.data);
      } else {
        const response =  await API.post(`/like/${id}`, { thread_id : id });
        console.log("berhasil menambahkan like", response.data);
      }
      dispatch(SET_THREAD_LIKE({ id: id, isLiked: !isLiked }));
    } catch (err) {
      dispatch(SET_THREAD_LIKE({ id: id, isLiked: isLiked }));
      console.log("Failed updating like!", err);
    }
  }

  return {
    threads,
    handlePostLike,
  };
}