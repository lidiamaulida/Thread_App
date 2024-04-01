import { useState } from "react";
import { API } from "../../../libs/api";
import { IuserSuggested } from "../../../interface/Auth";

export function useSuggested() {
    const [suggested, setSuggested] = useState<IuserSuggested[]>([])

    async function getUserSugested() {
        try {
          const response = await API.get(`/suggested`);
    
          setSuggested(response.data.data);
          console.log("ini response dugested", response);
        } catch (error) {
          console.log(error);
        }
    }

    return { suggested, getUserSugested };
}