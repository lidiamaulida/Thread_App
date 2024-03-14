import { useDispatch } from "react-redux";
import { API } from "../../../libs/api";
import { GET_FOLLOWS } from "../../../store/RootReducer";

export default function useFollow() {
    const dispatch = useDispatch();
    // const token = localStorage.getItem("token") + ""

    async function getFollowData(type: string) {
        try {
            const response = await API.get(`/follows?type=${type}&limit=10` )
            dispatch(GET_FOLLOWS(response.data))
            console.log(response.data);
        } catch (error) {
            throw error
        }
    }

    return {
        getFollowData
    }
}