import React, { ChangeEvent, FormEvent } from "react";
import { IThreadPost } from "../../../interface/Thread";
import { API } from "../../../libs/api";
import { useQuery, useMutation } from "@tanstack/react-query"

export function useThreads() {
    
      const {data: threads, isLoading, error, refetch } = useQuery({ 
        queryKey: ['threads'], 
        queryFn: async () => API.get('/threads').then((data) => data.data)
      })

    return {
        threads,
        isLoading,
        error,
        refetch
    }
}


export function usePostThread() {
    const { refetch } = useThreads()
    const [data, setData] = React.useState<IThreadPost>({
        content: "",
        image: "",
      });

    async function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value, files } = event.target;
        
        if (files) {
            setData({
                ...data,
                [name]: files[0],
            });
        } else {
            setData({
                ...data,
                [name]: value,
            });
        }
    }

    const fileInputRef = React.useRef<HTMLInputElement>(null)

    function handleButtonClick() {
        fileInputRef.current?.click()
      }
    
    async function handlePost(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();


        try {
            const formData = new FormData();

            formData.append("content", data.content)
            formData.append("image", data.image as File)

            const response = await API.post("/thread/post", formData);
            console.log(response);

            refetch()
        } catch (error) {
            throw error;
        }
    }

    return {
        data,
        handleChange,
        handleButtonClick,
        fileInputRef,
        handlePost
    }
}