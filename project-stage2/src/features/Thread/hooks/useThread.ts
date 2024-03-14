import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { IThreadPost } from "../../../interface/Thread";
import { API } from "../../../libs/api";
import { useDispatch } from "react-redux";
import { GET_THREADS } from "../../../store/RootReducer";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/types/RootTypes";

export function useThreads() {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token") + ""
    const threads = useSelector((state: RootState) => state.thread.threads);
    const [form, setForm] = useState<IThreadPost>({
      content: "" || undefined,
      image: "",
    });
    
    async function getThreads() {
      const response = await API.get(`/threads?limit=100`, {headers: { Authorization: `Bearer ${token}` }});
      dispatch(GET_THREADS(response.data));
    }
  
    async function handlePost(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
  
      const formData = new FormData();
      formData.append("content", form.content || "");
      formData.append("image", form.image as File);
  
      const response = await API.post("/thread/post", formData);
      console.log("Thread added successfully!", response);
      getThreads();
    }
  
    useEffect(() => {
      getThreads();
    }, []);
  
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      const { name, value, files } = event.target;
  
      if (name === "content") {
        setForm({
          ...form,
          [name]: value,
        });
      } else if (files && files.length > 0) {
        const selectedImage = files[0];
        const reader = new FileReader(); 
        reader.onloadend = () => {
          setForm({
            ...form,
            [name]: selectedImage,
            preview: reader.result as string
          });
        };
        reader.readAsDataURL(selectedImage);
      }
    }

    function handleRemoveImage() {
      setForm({
        ...form,
        image: "",
        preview: ""
      });
    }
  
    const fileInputRef = useRef<HTMLInputElement>(null);
  
    function handleButtonClick() {
      fileInputRef.current?.click();
    }
  
    return { handleChange, handlePost, fileInputRef, handleButtonClick, threads, form, handleRemoveImage };
  }