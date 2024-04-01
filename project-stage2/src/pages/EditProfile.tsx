import { Avatar, Box, Button, Image, Input, Text } from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link } from "react-router-dom";
import useEditProfile from "../features/Auth/hooks/useEditProfile";
import { useSelector } from "react-redux";
import { RootState } from "../store/types/RootTypes";

export default function EditProfile() {
    const auth = useSelector((state: RootState) => state.auth);
    const { formData, fileInputRef, handleChange, handleSubmit, handleButtonClick } = useEditProfile()

  return (
    <>
      <Box display="flex" w="100%" h="100vh" bg="black">
        <Box
          w="720px" 
          borderRight="1px" 
          borderColor="#313131"
          overflowY="auto"
         >
          <Box m={5}>
            <Text
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              fontSize="2xl"
              bgClip="text"
              fontWeight="bold"
            >
              Edit Profile
            </Text>
            <Link to={"/profile"}>
            <Box justifyContent={"start"} mt={5} fontSize={"20px"} mb={5}>
              <AiOutlineArrowLeft />
              <Text ml={7} mt={-7} fontWeight="bold">
                Back
              </Text>
            </Box>
            </Link>
          </Box>
          <Box>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Image
              width={"100%"}
              height={"230px"}
              objectFit="cover"
              src="https://i.pinimg.com/564x/01/23/58/01235842ae6fda5c2dc0b2a7a288a2ba.jpg"
              alt="Chakra UI"
              mb={-5}
            />
            {/* <Box m={3} width={"100px"} height={"50px"} p={5} bg={"red"}>
              <AiFillCamera 
              style={{marginLeft: "50px"}}
              width={"150px"}
              height={"150px"}
              />
            </Box> */}
            <Input
             name="image"
             id="image"
             type="file"
             onChange={handleChange}
             style={{ display: "none" }}
             ref={fileInputRef}
            />
            <button
            type="button"
            onClick={handleButtonClick}
            >
            {/* {formData.preview && ( */}
              <Avatar
                src={formData.profil_picture}
                name={formData.fullName}
                border={"7px solid black"}
                mt={-55}
                ml={5}
                width={"150px"}
                height={"150px"}
              />
            {/* )} */}
            </button>
            <Button
              colorScheme="pink"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              width="15%"
              ml="590px"
              mt={"-100px"}
              borderRadius="15"
              h={7}
              onClick={handleSubmit}
            //   variant="outline"
            >
              save
            </Button>
            <Box p={3}>
            <Text mb={2}>Full Name</Text>
            <Input 
             mb={3} 
             width={"100%"} 
             placeholder='Full Name' 
             value={formData.fullName}
             name="fullName"
             onChange={handleChange}
             />
            <Text mb={2}>User Name</Text>
            <Input 
             mb={3} 
             width={"100%"} 
             placeholder='User Name' 
             value={formData.userName}
             name="userName"
             onChange={handleChange}
             />
            <Text mb={2}>Profile Description</Text>
            <Input 
             mb={3} 
             width={"100%"} 
             placeholder='Profile Description'
             value={formData.profil_description}
             name="Profil_description"
             onChange={handleChange}
             />
            </Box>
          </form>
          </Box>
        </Box>
      </Box>
    </>
  );
}
