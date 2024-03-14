import { IThreadCard } from "../interface/Thread";
import { LuImagePlus } from "react-icons/lu";
import {
  Box,
  Text,
  Avatar,
  WrapItem,
  Input,
  Button,
  Flex,
  Center,
} from "@chakra-ui/react";
import { ThreadCard } from "../features/Thread/component/TheardsCard";
import { useThreads } from "../features/Thread/hooks/useThread";
import { RootState } from "../store/types/RootTypes";
import { useSelector } from "react-redux";

export default function Home() {
  const auth = useSelector((state: RootState) => state.auth);
  const {
    handleChange,
    handlePost,
    fileInputRef,
    handleButtonClick,
    handleRemoveImage,
    threads,
    form,
  } = useThreads();

  return (
    <>
      <Box display="flex" w="100%" h="100vh" bg="black">
        <Flex justifyContent="center">
          <Box
            w="720px"
            position="relative"
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
              m="5"
              fontWeight="bold"
            >
              Home
            </Text>
            <WrapItem mt={6} p={4} fontSize="2xl" display="flex" mb={8}>
              <Avatar
                size="md"
                mt={-2}
                name={auth.profil_picture ? auth.fullName : ""}
                src={auth.profil_picture}
              />
              <form onSubmit={handlePost} encType="multipart/form-data">
                <Center>
                  <Input
                    ml={3}
                    mt={1}
                    mr={3}
                    width="500px"
                    name="content"
                    variant="unstyled"
                    placeholder="what is happening?..."
                    // value={data.content}
                    onChange={handleChange}
                  />
                  {/* <button
                  color={"brand.green"}
                  // type="submit"
                  onClick={handleButtonClick}
                > */}
                  <button
                    //  as="label"
                    //  htmlFor="image"
                    type="button"
                    onClick={handleButtonClick}
                  >
                    <LuImagePlus
                      style={{
                        marginLeft: "5px",
                      }}
                    />
                  </button>
                  {/* </button> */}
                  <Input
                    name="image"
                    id="image"
                    type="file"
                    onChange={handleChange}
                    style={{ display: "none" }}
                    ref={fileInputRef}
                  />

                  <Button
                    colorScheme="pink"
                    bgGradient="linear(to-l, #7928CA, #FF0080)"
                    width="20%"
                    ml={3}
                    borderRadius="20"
                    type="submit"
                  >
                    Post
                  </Button>
                </Center>
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
                postedAt={data.postedAt}
                is_liked={data.is_liked}
                key={index}
              />
            ))}
          </Box>
        </Flex>
      </Box>
    </>
  );
}
