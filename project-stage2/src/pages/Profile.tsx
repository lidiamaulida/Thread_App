import { AiOutlineArrowLeft } from "react-icons/ai";
import { Avatar, Box, Button, Heading, Image, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../store/types/RootTypes";
import { useThreadUser } from "../features/Thread/hooks/useThreadUser";
import { ThreadCard } from "../features/Thread/component/TheardsCard";
import { IThreadCard } from "../interface/Thread";

const ProfilePage = () => {
  const auth = useSelector((state: RootState) => state.auth)
  const { threads, getThreads } =useThreadUser();

  return (
    <>
      <Box display="flex" w="100%" h="100vh" bg="black">
        <Box 
         w="720px" 
         borderRight="1px" 
         borderColor="#313131"
         overflowY="auto"
        //  p={5}
         >
          <Box m={5}>
            <Text
             bgGradient="linear(to-l, #7928CA, #FF0080)"
             fontSize="2xl"
             bgClip="text"
             fontWeight="bold"
            >
              Profile
            </Text>
            <Box justifyContent={"start"} mt={5} fontSize={"20px"} mb={5}>
              <AiOutlineArrowLeft />
              <Text ml={7} mt={-7} fontWeight="bold">
                @{auth.userName}
              </Text>
            </Box>
          </Box>
          <Box>
            <Image
               width={"100%"}
               height={"230px"}
               objectFit="cover"
               src="https://i.pinimg.com/564x/01/23/58/01235842ae6fda5c2dc0b2a7a288a2ba.jpg"
               alt="Chakra UI"
               mb={-5}
            />
            <Avatar
                src={auth.profil_picture}
                name={auth.profil_picture ? auth.fullName : ""}
                border={"7px solid black"}
                mt={-55}
                ml={5}
                width={"150px"}
                height={"150px"}
            />
            <Button
              ml="550px"
              mt={"-100px"}
              borderRadius="15"
              h={7}
              colorScheme="white"
              variant="outline"
            >
              edit profile
            </Button>
          </Box>
          <Box m={5} mt={3}>
            <Heading size="lg" fontWeight="bold">{auth.fullName}</Heading>
            <Text fontSize="sm" color="#CBD5E0">@{auth.userName}</Text>
            <Text mb={2} mt={3}>{auth.profil_description}</Text>
          </Box>
          <Box display="flex" m={5} mt={-2}>
            <Text fontWeight="bold">{auth.followings_count}</Text>
            <Text ml={1}>Following</Text>
            <Text ml={3} fontWeight="bold">
              {auth.followers_count}
            </Text>
            <Text ml={1}>Followers</Text>
          </Box>

          {/* tab panel */}
          <Box>
            <Tabs color="white" colorScheme="pink" w="720px">
             <TabList color="white" justifyContent={"center"}>
              <Tab width="48%" >
                <Text color="white" onClick={() => getThreads}>Post</Text>
              </Tab>
              <Tab width="48%">
                <Text color="white">Like</Text>
              </Tab>
             </TabList>

             <TabPanels>
                <TabPanel p={0} overflowY="auto" >
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
                </TabPanel>
                <TabPanel>
                  Like
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProfilePage;
