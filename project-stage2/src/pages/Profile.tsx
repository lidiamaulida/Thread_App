import Nav from "../component/NavigationItem";
import Profile from "../component/Profile";
import { Box, Text } from "@chakra-ui/react";

const ProfilePage = () => {
  return (
    <>
      <Box display="flex" w="100%" h="100vh" bg="black">
        <Box display={"flex"} justifyContent={"start"}>
          <Nav />
        </Box>
        <Box 
         w="720px" 
         p={5}>
        <Text
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            fontSize="2xl"
            bgClip="text"
            fontWeight="bold"
          >
            Search
          </Text>
          {/* <Input></Input> */}
        </Box>
        <Box display={"flex"} flexDirection={"column"} justifyContent={"end"}>
          <Profile />
        </Box>
      </Box>
    </>
  );
};

export default ProfilePage;
