import { useParams } from "react-router-dom";
import { API } from "../../../libs/api";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { IThreadReply } from "../../../interface/Replies";

export function useReply() {
    const { id } = useParams()
    const [form, setForm] = useState<IThreadReply>({
        content: "",
        image: "",
      });

      const {data: getReplies, refetch } = useQuery({
        queryKey: ["replies"],
        queryFn: async () => await API.get(`/reply/${id}`).then(res => res.data.data).catch(error => error.message)
      })

    async function handlePostReply(event: FormEvent<HTMLFormElement>) {
        try {
            event.preventDefault();
    
            const formData = new FormData();
            formData.append("content", form.content || "");
            formData.append("image", form.image as File);
            // formData.append("id", id as string)
    
           const response = await API.post(`/reply/${Number(id)}`, formData, {
            headers :{
              "Content-Type" : "multipart/form-data"
            }
           });
           console.log("reply added successfully!", response);
           refetch();
        } catch (error) {
            throw error
        }
      }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value, } = event.target;
  
          setForm({
            ...form,
            [name]: value,
          });
    }

    function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
      const { name, files } = event.target;
      
      if (files && files.length > 0) {
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


    return { getReplies, form, handlePostReply, handleChange, handleButtonClick, handleRemoveImage, handleImageChange, fileInputRef }
}