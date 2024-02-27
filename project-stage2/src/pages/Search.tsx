import { RiUserSearchLine } from "react-icons/ri";
import Nav from "../component/NavigationItem";
import Profile from "../component/Profile";
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";

const Search = () => {
  return (
    <>
      <Box display="flex" w="100%" h="100vh" bg="black">
        <Box display={"flex"} justifyContent={"start"}>
          <Nav />
        </Box>
        <Box w="720px" p={5} borderRight="1px"borderColor="#313131">
          <Text
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            fontSize="2xl"
            bgClip="text"
            fontWeight="bold"
          >
            Search
          </Text>
          <InputGroup mt={5}>
            <InputLeftElement pointerEvents="none">
              <RiUserSearchLine color="white" />
            </InputLeftElement>
            <Input variant='unstyled' type="text" color={"white"} bg={"#262626"} borderRadius={"15px"} h={"40px"} placeholder='search'/>
          </InputGroup>
        </Box>
        <Box display={"flex"} flexDirection={"column"} justifyContent={"end"}>
          <Profile />
        </Box>
      </Box>
    </>
  );
};

export default Search;
