import Nav from "../component/NavigationItem";
import Profile from "../component/Profile";
import {
  Avatar,
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Button,
  Center
} from "@chakra-ui/react";
import { FollowCrad } from "../features/FollowCard";

const Follows = () => {
  return (
    <>
      <Box display="flex" w="100%" h="100vh" bg="black" justifyContent={"center"}>
        <Box display={"flex"} justifyContent={"start"}>
          <Nav />
        </Box>
        <Box
          position="relative"
          //  right="60"
          //  left="80"
          p="5"
          color="white"
        >
          <Text
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            fontSize="2xl"
            bgClip="text"
            fontWeight="bold"
          >
            Follow
          </Text>
          <Tabs color="white" colorScheme="pink">
            <TabList color="white">
              <Tab width="340px">
                {" "}
                <Text color="white">Followers</Text>
              </Tab>
              <Tab width="340px">
                <Text color="white">Following</Text>
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Box display="flex" mt={2} width={"340px"}>
                  <Avatar
                    name="Dan Abrahmov"
                    src="https://bit.ly/dan-abramov"
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
              </TabPanel>
              <TabPanel>
                <p>Following</p>
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
