import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillFacebook,
  AiFillInstagram,
} from "react-icons/ai";
import { Box, Text, Avatar, Button, Image, Heading } from "@chakra-ui/react";

const Profile = () => {
  return (
    <>
      <Box
        bg="black"
        w="400px"
        justifyContent={"end"}
        p={4}
        h="100vh"
        // position="fixed"
        // borderLeft="1px"
        // borderColor="#313131"
        // right="0"
        // top="0"
        // bottom="0"
      >
        <Box maxW="sm" bg="#262626" color="white" p={5} borderRadius={10} > 
          <Text fontWeight="bold" mb={2}>
            My Profile
          </Text>
          <Image
            src="https://i.pinimg.com/564x/ab/eb/86/abeb86160114c141c0afb1e0679b3630.jpg"
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Box ml={5}>
            <Avatar
              mt={-5}
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
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
          <Heading size="md">Jay Edward</Heading>
          <Text color="#313131">@edwardjay</Text>
          <Text mb={2}>a sprinkle of vintage design.</Text>
          <Box display="flex">
            <Text fontWeight="bold">331</Text>
            <Text ml={1}>Following</Text>
            <Text ml={3} fontWeight="bold">
              500
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
          <Box display="flex" mt={2}>
            <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            <Box flexDirection="column" ml={3}>
              <Text>Jake</Text>
              <Text>@jake01</Text>
            </Box>
            <Button
              ml="100px"
              mt={2}
              paddingLeft={5}
              paddingRight={5}
              borderRadius="15"
              h={7}
              colorScheme="white"
              variant="outline"
            >
              Follow
            </Button>
          </Box>
          <Box display="flex" mt={3}>
            <Avatar
              name="Dan Abrahmov"
              src="https://i.pinimg.com/564x/64/7b/a2/647ba2eb2b1f47dc5d8b57a7a4727858.jpg"
            />
            <Box flexDirection="column" ml={3}>
              <Text>Jake</Text>
              <Text>@jake01</Text>
            </Box>
            <Button
              ml="100px"
              mt={2}
              paddingLeft={5}
              paddingRight={5}
              borderRadius="15"
              h={7}
              colorScheme="white"
              variant="outline"
            >
              Follow
            </Button>
          </Box>
          <Box display="flex" mt={3}>
            <Avatar
              name="Dan Abrahmov"
              src="https://i.pinimg.com/564x/e0/ef/85/e0ef85ef3a355529f7c18de76ef5ede4.jpg"
            />
            <Box flexDirection="column" ml={3}>
              <Text>Jane</Text>
              <Text>@jannee</Text>
            </Box>
            <Button
              ml="100px"
              mt={2}
              paddingLeft={5}
              paddingRight={5}
              borderRadius="15"
              h={7}
              colorScheme="white"
              variant="outline"
            >
              Follow
            </Button>
          </Box>
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
