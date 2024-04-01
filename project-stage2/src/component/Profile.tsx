import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillFacebook,
  AiFillInstagram,
} from "react-icons/ai";
import { Box, Text, Avatar, Button, Image, Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../store/types/RootTypes";
import { useSuggested } from "../features/Auth/hooks/useSugested";
import { IuserSuggested } from "../interface/Auth";
import { SuggestedCard } from "./suggested";
import React from "react";

const Profile = () => {
  const { suggested, getUserSugested } = useSuggested()
  const auth = useSelector((state: RootState) => state.auth)

  React.useEffect(() => {
    getUserSugested()
  }, [])
  
  return (
    <>
      <Box
        bg="black"
        w="400px"
        justifyContent={"end"}
        p={4}
        h="100vh"
      >
        <Box maxW="sm" bg="#262626" color="white" p={5} mt={3} borderRadius={10} > 
          <Text fontWeight="bold" mb={2}>
            My Profile
          </Text>
          <Image
            src="https://i.pinimg.com/564x/ab/eb/86/abeb86160114c141c0afb1e0679b3630.jpg"
            alt="Green double couch with wooden legs"
            borderRadius="lg"
            objectFit={"cover"}
          />
          <Box ml={5}>
           <Avatar
                src={auth.profil_picture}
                name={auth.profil_picture ?  "" :auth.fullName}
                position={"absolute"}
                border={"5px solid #262626"}
                mt={-30}
                width={"60px"}
                height={"60px"}
              />
            <Button
              ml="180px"
              mt={3}
              borderRadius="15"
              h={7}
              colorScheme="white"
              variant="outline"
            >
              edit profile
            </Button>
          </Box>
          <Heading size="md" fontWeight="bold">{auth.fullName}</Heading>
          <Text fontSize="xs" color="#CBD5E0" mt={1}>@{auth.userName}</Text>
          <Text mb={2}>{auth.profil_description}</Text>
          <Box display="flex">
            <Text fontWeight="bold">{auth.followings_count}</Text>
            <Text ml={1}>Following</Text>
            <Text ml={3} fontWeight="bold">
              {auth.followers_count}
            </Text>
            <Text ml={1}>Followers</Text>
          </Box>
        </Box>


        <Box
          maxW="sm"
          bg="#262626"
          overflowY="auto"
          color="white"
          p={5}
          borderRadius={10}
          mt={5}
        >
          <Heading size="md">Suggested for you</Heading>
          {suggested?.map((data: IuserSuggested, index: number) => (
          <SuggestedCard
            key={index}
            id={data.id}
            fullName={data.fullName}
            userName={data.userName}
            email={data.email}
            profil_picture={data.profil_picture}
            is_followed={data.is_followed}
           />
          ))}
        </Box>


        <Box
          maxW="sm"
          bg="#262626"
          color="white"
          p={5}
          borderRadius={10}
          mt={5}
        >
          <Box display="flex">
            <Text mr={2}>
              Developed by Lidia <FontAwesomeIcon width="6px" icon={faCircle} />
            </Text>
            <Box display="flex" mt={1}>
              <AiFillGithub />
              <AiFillLinkedin style={{ marginLeft: "3px" }} />
              <AiFillFacebook style={{ marginLeft: "3px" }} />
              <AiFillInstagram style={{ marginLeft: "3px" }} />
            </Box>
          </Box>
          <Box display="flex" fontSize="11px">
            <Text>Powered by</Text>
            <Image
              src="https://dumbways.id/assets/images/brandred.png"
              w="18px"
              h={3}
              ml={1}
              mt="5px"
            />
            <Text ml="5px">
              Dumbways Indonesia <FontAwesomeIcon width="4px" icon={faCircle} />{" "}
              #1 Coding Bootcamp
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Profile;
