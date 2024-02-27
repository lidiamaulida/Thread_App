import { Avatar, Box, Button, Text } from "@chakra-ui/react";
import { IFollows } from "../interface/Follow";

export function FollowCrad(props: IFollows) {
  return (
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
  );
}
