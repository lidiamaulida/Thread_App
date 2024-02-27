import React, { ChangeEvent } from "react";
import { IRegister } from "../interface/Auth";
import { useNavigate } from "react-router-dom";
import { API } from "../libs/api";

export function useRegister() {
    const [data, setData] = React.useState<IRegister>({
        fullName: "",
        email: "",
        password: ""
      })
    
      const Navigate = useNavigate()
    
      async function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setData({
          ...data, 
          [e.target.name]: e.target.value
        })
      }
    
      console.log(data, "ini data");
      
    
      async function handleSubmit() {
        try {
          const response = await API.post("/user/register", data)
    
          console.log(response);
          Navigate('/login')
        } catch (error) {
          throw error
        }
    }

    return {
        data,
        handleChange,
        handleSubmit
    }
}