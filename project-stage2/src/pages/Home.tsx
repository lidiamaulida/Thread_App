import React from "react";
import { IThreadCard } from "../interface/Thread";
import Nav from "../component/NavigationItem";
import Profile from "../component/Profile";
import { LuImagePlus } from "react-icons/lu";
import {
  Box,
  Text,
  Avatar,
  WrapItem,
  Input,
  Button,
  Flex,
  Center
} from "@chakra-ui/react";
import { ThreadCard } from "../features/Thread/component/TheardsCard";
import { API } from "../libs/api";
import { usePostThread } from "../features/Thread/hooks/useThread";

export default function Home() {
  const [threads, setThreads] = React.useState<IThreadCard[]>([]);
  const { data, handleChange, handleButtonClick, handlePost, fileInputRef} = usePostThread()

  async function getThread() {
    try {
      const response = await API.get("/threads");

      setThreads(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    const data = getThread().then((data) => console.log(data));

    console.log(data, "oo");
  }, []);

  return (
    <>
      <Box display="flex" w="100%" h="100vh" bg="black">
        {/* <Box display={"flex"} justifyContent={"start"}>
          <Nav />
        </Box> */}
        <Flex justifyContent="center">
          <Box
            w="720px"
            position="relative"
            // right="70"
            // left="80"
            bg="black"
            color={"white"}
            borderRight="1px"
            borderColor="#313131"
            overflowY="auto"
          >
            <Text
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              fontSize="2xl"
              bgClip="text"
              // mt={4}
              // p={3}
              m="5"
              fontWeight="bold"
            >
              Home
            </Text>
            <WrapItem mt={6} p={4} fontSize="2xl" display="flex" mb={8}>
              <Avatar
                size="md"
                mt={-2}
                name="Dan Abrahmov"
                src="https://bit.ly/dan-abramov"
              />
              <form 
               onSubmit={handlePost} 
               encType="multipart/form-data">
                <Center>
                <Input
                  ml={3}
                  mt={1}
                  mr={3}
                  width="60%"
                  name="content"
                  variant="unstyled"
                  placeholder="what is happening?..."
                  value={data.content}
                  onChange={handleChange}
                />
                <button
                  // style={{ display: "none" }}
                  color={"brand.green"}
                  onClick={handleButtonClick}
                >
                  <LuImagePlus
                    style={{
                      marginLeft: "250px"
                    }}
                  />
                </button>
                <Input
                  name="image"
                  type="file"
                  onChange={handleChange}
                  style={{ display: "none" }}
                  ref={fileInputRef}
                />

                {/* <input
                  type="file"
                  id="file"
                  className="hidden"
                  name="image"
                  style={{ display: "none" }}
                  onChange={handleChange}
                />
                <label htmlFor="file">
                <button type="button">
                  <LuImagePlus />
                </button>
              </label> */}

                <Button
                  colorScheme="pink"
                  bgGradient="linear(to-l, #7928CA, #FF0080)"
                  width="30%"
                  ml={5}
                  borderRadius="20"
                  type='submit'
                >
                  Post
                </Button>
                </Center>
              </form>
            </WrapItem>
            {threads?.map((data: IThreadCard, index: number) => (
              <ThreadCard
                id={data.id}
                fullName={data?.user?.fullName}
                userName={data?.user?.userName}
                content={data.content}
                image={data.image}
                profilePicture={data?.user?.profil_picture}
                likesCount={data.likesCount}
                repliesCount={data.repliesCount}
                posted_at={data.posted_at}
                key={index}
              />
            ))}
          </Box>
        </Flex>
        {/* <Box display={"flex"} flexDirection={"column"} justifyContent={"end"}>
          <Profile />
        </Box> */}
      </Box>
    </>
  );
}
