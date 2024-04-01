import { useSelector } from "react-redux";
import { RootState } from "../../../store/types/RootTypes";
import { useRef, useState } from "react";
import { API } from "../../../libs/api";

export default function useEditProfile() {
  const auth = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({
    fullName: auth.fullName,
    userName: auth.userName,
    profil_description: auth.profil_description,
    profil_picture: auth.profil_picture,
  });
  console.log(formData, "ini form updte");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "fullName" || "userName" || "profil_description") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else if (files && files.length > 0) {
      const selectedImage = files[0];
      const reader = new FileReader(); 
      reader.onloadend = () => {
        setFormData({
          ...formData,
          [name]: selectedImage,
          // preview: reader.result as string
        });
      };
      reader.readAsDataURL(selectedImage);
    }
    // setFormData({ ...formData, [name]: value });
  };

  function handleRemoveImage() {
    setFormData({
      ...formData,
      profil_picture: "",
      // preview: ""
    });
  }

  async function handleSubmit() {
    const response = await API.patch("/update", formData)

    console.log(response, 'update User');
  }

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleButtonClick() {
    fileInputRef.current?.click();
  }

  return {
    formData,
    fileInputRef,
    handleChange,
    handleSubmit,
    handleRemoveImage,
    handleButtonClick
  }
}
