import React, { ChangeEvent } from "react";
// import * as Yup from 'yup';
import { ILogin } from "../../../interface/Auth";
import { useNavigate } from "react-router-dom";
import { API } from "../../../libs/api";
import { AUTH_LOGIN, AUTH_LOGOUT } from "../../../store/RootReducer";
import { useDispatch } from "react-redux";

// const Loginschema = Yup.object().shape({
//   email: Yup.string().email().required('email must be required'),
//   password: Yup.string().min(5, "password min 5").required(),
// });

export function useLogin() {
  const dispatch = useDispatch()
  const Navigate = useNavigate()
    const [data, setData] = React.useState<ILogin>({
        email: "",
        password: ""
      })
    
      async function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setData({
          ...data,
          [e.target.name]: e.target.value
        })
      }
    
      async function handleSubmit() {
        try {
          // const errors = await Loginschema.validate(data);
          // if (errors) {
          //   return errors;
          // } else {
            const response = await API.post("/user/login", data)
            dispatch(AUTH_LOGIN(response.data))
      
            console.log(response, "res");
            Navigate('/')
          // }
        } catch (error) {
          throw error
        }
    }

    const handleLogout = () => {
      try {
        dispatch(AUTH_LOGOUT())
        Navigate("/login")
      } catch (error) {
        console.log(error);
      }
    }

    return {
        handleLogout,
        handleChange,
        handleSubmit
    }
}