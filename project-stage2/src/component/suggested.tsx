import { Avatar, Box, Button, Text } from "@chakra-ui/react";
import { IuserSuggested } from "../interface/Auth";
import { useDispatch } from "react-redux";
import { SET_FOLLOW } from "../store/RootReducer";
import { API } from "../libs/api";

export function SuggestedCard(props: IuserSuggested) {
    const dispatch = useDispatch();
    async function handleFollow(
        id: number,
        followedUserId: number,
        isFollowed: boolean
      ) {
        try {
          if (!isFollowed) {
            const response = await API.post(`/followUser`, {
              followedUserId: followedUserId,
            });
            dispatch(SET_FOLLOW({ id: id, isFollowed: isFollowed }));
            console.log("berhasil follow!", response.data);
          } else {
            const response = await API.delete(`/unfollowUser/${followedUserId}`);
            dispatch(SET_FOLLOW({ id: id, isFollowed: isFollowed }));
            console.log("berhasil unfollow!", response.data);
          }
        } catch (err) {
          console.log(err);
        }
      }

    return (
        <>
        <Box display="flex" mt={2}>
            <Avatar name={props.fullName} src={props.profil_picture} />
            <Box flexDirection="column" ml={3} width={"150%"}>
              <Text>{props.fullName}</Text>
              <Text>@{props.userName}</Text>
            </Box>
            <Button
              // ml="100px"
              mt={2}
              paddingLeft={10}
              paddingRight={10}
              borderRadius="15"
              h={7}
              colorScheme="white"
              variant="outline"
              onClick={() =>
                handleFollow(props.id, props.id, props.is_followed)
              }
            >
              {props.is_followed ? "Unfollow" : "Follow"}
            </Button>
          </Box>
        </>
    )
}