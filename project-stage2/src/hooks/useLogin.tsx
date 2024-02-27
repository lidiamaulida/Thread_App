import React, { ChangeEvent } from "react";
import { ILogin } from "../interface/Auth";
import { useNavigate } from "react-router-dom";
import { API } from "../libs/api";
import { AUTH_LOGIN } from "../store/RootReducer";
import { useDispatch } from "react-redux";

export function useLogin() {
  const dispatch = useDispatch()
  const Navigate = useNavigate()
    const [data, setData] = React.useState<ILogin>({
        email: "",
        password: ""
      })
    
      console.log(data, "data");
    
    
      async function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setData({
          ...data,
          [e.target.name]: e.target.value
        })
      }
    
      async function handleSubmit() {
        try {
          const response = await API.post("/user/login", data)
          dispatch(AUTH_LOGIN(response.data))
    
          console.log(response, "res");
          Navigate('/')
        } catch (error) {
          throw error
        }
    }

    return {
        handleChange,
        handleSubmit
    }
}