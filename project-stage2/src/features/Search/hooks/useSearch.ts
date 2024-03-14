import { API } from "../../../libs/api"
import { Iuser } from "../../../interface/Auth";
import { ChangeEvent, useState } from "react";

export function useSearch() {
    const [users, setUsers] = useState<Iuser[]>([])
    const [ showUser, setShowUser ] = useState(false)
    const [form, setForm] = useState({
      name: "",
    });
  
    async function getUser(keyword: string) {
        try {
          const response = await API.get(`/search?keyword=${keyword}`);
    

          setShowUser(true)
          setUsers(response.data.data);
          console.log(response.data.data);
        } catch (error) {
          console.log(error);
        }
    } 
    
    function handleRequest(event: ChangeEvent<HTMLInputElement>) {
      const { name, value, } = event.target;
  
      setForm({
          ...form,
          [name]: value
        })
      getUser(value)
    }

    return { users, getUser, handleRequest, showUser };
}