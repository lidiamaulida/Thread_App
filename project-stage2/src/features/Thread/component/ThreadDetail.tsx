import React from "react";
import { Avatar, Box, Button, Center, Input, Text } from "@chakra-ui/react";
import Nav from "../../../component/NavigationItem";
import Profile from "../../../component/Profile";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { RepliesCard } from "../../Reply/componnent/RepliesCard";
import { ThreadCard } from "./TheardsCard";
import { IThreadCard } from "../../../interface/Thread";
import { API } from "../../../libs/api";
import { useParams, Link } from "react-router-dom";
import { LuImagePlus } from "react-icons/lu";
import { IReply } from "../../../interface/Reply";
import { RootState } from "../../../store/types/RootTypes";
import { useSelector } from "react-redux";
import { useReply } from "../../Reply/hooks/useReplay";

export function ThreadDetail() {
  const auth = useSelector((state: RootState) => state.auth)
  const { getReplies,  form, fileInputRef, handlePostReply, handleChange, handleButtonClick, handleRemoveImage, handleImageChange } = useReply()
  const [threads, setThreads] = React.useState<IThreadCard>();
  const { id } = useParams();

  async function getThread() {
    try {
      const response = await API.get(`/thread/${id}`);

      setThreads(response.data.data);
    } catch (error) {
      throw error;
    }
  }

  React.useEffect(() => {
    getThread();
  }, [id]);

  return (
    <>
      <Box display="flex" w="100%" h="100vh" bg="black">
      <Box display={"flex"} justifyContent={"start"}>
          <Nav />
        </Box>
        <Box
          w="720px"
          position="relative"
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
                is_liked={threads.is_liked}
                postedAt={threads.postedAt}
                // key={index}
              />
            )}
          </Box>
          <Box mt={5} display="flex" fontSize="2xl" mb={5}>
            <Avatar
              size="md"
              ml={3}
              name={auth.profil_picture ? auth.fullName : ""}
              src={auth.profil_picture}
            />
          <form
           onSubmit={handlePostReply} 
           encType='multipart/form-data'
          >
            <Input
              ml={3}
              mt={2}
              mr={3}
              width="360px"
              name="content"
              variant="unstyled"
              placeholder="type reply..."
              onChange={handleChange}
              value={form.content}
            />
            <input
              type="file"
              id="file"
              className="hidden"
              name="image"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <button 
             style={{ marginLeft: "50px",  marginTop: "2px"}} 
             type="button"
            //  htmlFor="file"
             onClick={handleButtonClick}
             >
              <LuImagePlus />
            </button>
            <Button
              colorScheme="pink"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              width="12%"
              mt={-1}
              ml={5}
              // mr={-10}
              type="submit"
              borderRadius="20"
            >
              Post
            </Button>
            {form.preview && (
                  <Box>
                    <button onClick={handleRemoveImage}>
                      <Text fontSize={"medium"}>X</Text>
                    </button>
                    <img
                      src={form.preview}
                      alt="Preview"
                      style={{
                        maxWidth: "100px",
                        maxHeight: "100px",
                        marginLeft: "20px",
                        marginTop: "10px",
                      }}
                    />
                  </Box>
                )}
          </form>
          </Box>
          { getReplies?.length === 0 ? (
              <Text textAlign={"center"}>No recent comments</Text>
          ) : (getReplies?.map((reply: IReply) => (
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
              />
            </Box>
           )))
          }
        </Box>
        <Box display={"flex"} flexDirection={"column"} justifyContent={"end"}>
          <Profile />
        </Box>
      </Box>
    </>
  );
}
