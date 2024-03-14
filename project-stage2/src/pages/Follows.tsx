import Nav from "../component/NavigationItem";
import Profile from "../component/Profile";
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import useFollow from "../features/Follows/hooks/useFolllow";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/types/RootTypes";
import { FollowCard } from "../features/Follows/componnetnt/FollowCard"

const Follows = () => {
  const { getFollowData, } = useFollow()
  const follow = useSelector((state: RootState) => state.follows)

  React.useEffect(() => {
    getFollowData("followers")
  }, [])

  return (
    <>
      <Box display="flex" w="100%" h="100vh" bg="black" justifyContent={"center"}>
        <Box display={"flex"} justifyContent={"start"}>
          <Nav />
        </Box>
        <Box
          position="relative"
          p="5"
          color="white"
          borderRight="1px"
          borderColor="#313131"
        >
          <Text
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            fontSize="2xl"
            bgClip="text"
            fontWeight="bold"
          >
            Follow
          </Text>
          <Tabs color="white" colorScheme="pink" w="680px">
            <TabList color="white">
              <Tab width="50%" onClick={() => getFollowData("followers")} >
                <Text color="white">Followers</Text>
              </Tab>
              <Tab width="50%" onClick={() => getFollowData("followings")}>
                <Text color="white">Following</Text>
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
              {follow.follows.map((data, index) => {
                return (
                <FollowCard
                  key={index}
                  id={data.id}
                  user_id={data.user_id}
                  fullName={data.fullName}
                  userName={data.userName}
                  email={data.email}
                  profil_picture={data.profil_picture}
                  profil_description={data.profil_description}
                  is_followed={data.is_followed}
                />
              )})}
              </TabPanel>
              <TabPanel>
                {follow.follows.map((data, index) => {
                return (
                <FollowCard
                  key={index}
                  id={data.id}
                  user_id={data.user_id}
                  fullName={data.fullName}
                  userName={data.userName}
                  email={data.email}
                  profil_picture={data.profil_picture}
                  profil_description={data.profil_description}
                  is_followed={data.is_followed}
                />
              )})}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <Box display={"flex"} flexDirection={"column"} justifyContent={"end"}>
          <Profile />
        </Box>
      </Box>
    </>
  );
};

export default Follows;
