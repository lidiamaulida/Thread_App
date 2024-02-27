import React from "react";
import { Avatar, Box, Button, Center, Input, Text } from "@chakra-ui/react";
import Nav from "../component/NavigationItem";
import Profile from "../component/Profile";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { RepliesCard } from "./Reply/componnent/RepliesCard";
import { ThreadCard } from "./Thread/component/TheardsCard";
import { IThreadCard } from "../interface/Thread";
import { API } from "../libs/api";
import { useParams, Link } from "react-router-dom";
import { LuImagePlus } from "react-icons/lu";
import { IReply } from "../interface/Reply";

export function ThreadDetail() {
  const [threads, setThreads] = React.useState<IThreadCard>();
  const [reply, setReply] = React.useState<IReply[]>([]);
  const { id } = useParams();

  async function getThread() {
    try {
      const response = await API.get(`/thread/${id}`);

      setThreads(response.data.data);
    } catch (error) {
      throw error;
    }
  }

  async function getReply() {
    try {
      const response = await API.get(`/reply/${id}`);
      setReply(response.data.data);
      console.log(response.data);
    } catch (error) {
      throw error;
    }
  }

  React.useEffect(() => {
    getThread();
  }, [id]);

  React.useEffect(() => {
    const data = getReply().then((data) => console.log(data));

    console.log(data);
  }, []);

  return (
    <>
      <Box display="flex" w="100%" h="100vh" bg="black">
      <Box display={"flex"} justifyContent={"start"}>
          <Nav />
        </Box>
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
          <Link to={"/"}>
            <Box display="flex" m="5" fontSize="25px">
              <Center>
                <AiOutlineArrowLeft />
                <Text ml="3" fontWeight="bold">
                  Status
                </Text>
              </Center>
            </Box>
          </Link>
          <Box>
            {threads && (
              <ThreadCard
                id={threads.id}
                fullName={threads?.user?.fullName}
                userName={threads?.user?.userName}
                content={threads.content}
                image={threads.image}
                profilePicture={threads?.user?.profil_picture}
                likesCount={threads.likesCount}
                repliesCount={threads.repliesCount}
                posted_at={threads.posted_at}
                // key={index}
              />
            )}
          </Box>
          <Box mt={5} display="flex" fontSize="2xl" mb={5}>
            <Avatar
              size="md"
              ml={3}
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
            />
            <Input
              ml={3}
              mt={1}
              mr={3}
              width="60%"
              name="content"
              variant="unstyled"
              placeholder="type reply..."
            />
            <input
              type="file"
              id="file"
              className="hidden"
              name="image"
              style={{ display: "none" }}
            />
            <label style={{ marginLeft: "50px" }} htmlFor="file">
              <LuImagePlus />
            </label>
            <Button
              colorScheme="pink"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              width="12%"
              mt={-1}
              ml={5}
              mr={-10}
              borderRadius="20"
            >
              Post
            </Button>
          </Box>
          {/* {reply?.map((reply: IReply, index: number) => (
          <Box key={reply.id} >
            <RepliesCard
            id={reply.id}
            fullName={reply?.user?.fullName}
            userName={reply?.user?.userName}
            content={reply.content}
            image={reply.image}
            profilePicture={reply?.user?.profil_picture}
            likesCount={reply.likesCount}
            repliesCount={reply.repliesCount}
            posted_at={reply.posted_at}
            key={index}
            />
          </Box>
          ))} */}
          {reply?.map((reply: IReply, index: number) => (
            <Box key={reply.id}>
              <RepliesCard
                id={reply.id}
                fullName={reply?.user?.fullName}
                userName={reply?.user?.userName}
                content={reply.content}
                image={reply.image}
                profilePicture={reply?.user?.profil_picture}
                likesCount={reply.likesCount}
                repliesCount={reply.repliesCount}
                posted_at={reply.posted_at}
                key={index}
              />
            </Box>
          ))}
        </Box>
        <Box display={"flex"} flexDirection={"column"} justifyContent={"end"}>
          <Profile />
        </Box>
      </Box>
    </>
  );
}
