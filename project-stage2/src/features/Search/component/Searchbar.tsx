import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { RiUserSearchLine } from "react-icons/ri";
import { useSearch } from "../hooks/useSearch";
import React from "react";
import { SearchUserCard } from "./searchUser";

export function FormSearch() {
  const { users, getUser, handleRequest, showUser } = useSearch()

//   React.useEffect(() => {
//     const data = getUser("").then((data) => console.log(data))

//     console.log(data, "data user");
// }, [])

React.useEffect(() => {
  getUser("")
}, [])


  return (
    <>
      <Box w="720px" p={5} borderRight="1px" borderColor="#313131">
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          fontSize="2xl"
          bgClip="text"
          fontWeight="bold"
        >
          Search
        </Text>
        <Box mb={5}>
        <InputGroup mt={5}>
          <InputLeftElement pointerEvents="none">
            <RiUserSearchLine color="white" />
          </InputLeftElement>
          <Input
            variant="unstyled"
            type="text"
            color={"white"}
            bg={"#262626"}
            borderRadius={"15px"}
            h={"40px"}
            placeholder="search"
            onChange={handleRequest}
          />
        </InputGroup> 

        {showUser && 
        <Box>
        {users.map((data, index) => {
          return (
          <SearchUserCard
            key={index}
            id={data.id}
            fullName={data.fullName}
            userName={data.userName}
            email={data.email}
            profil_picture={data.profil_picture}
            profil_description={data.profil_description}
            is_followed={data.is_followed}
          />
        )})}
        </Box>
        }
        </Box>
      </Box>
    </>
  );
}
