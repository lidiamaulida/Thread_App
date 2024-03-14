import {
    Avatar,
    Box,
    Button,
    Text,
  } from "@chakra-ui/react";
import { IuserSearch } from "../../../interface/Auth";
import { useDispatch } from "react-redux";
import { SET_FOLLOW } from "../../../store/RootReducer";
import { API } from "../../../libs/api";


export function SearchUserCard(props: IuserSearch) {
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
        <Box display="flex" mt={2} width="fit-content">
            <Avatar
              name={props.profil_picture ? props.fullName : ""}
              src={props.profil_picture}
            />
            <Box flexDirection="column" ml={3} w={"350px"}>
              <Text fontWeight={"bold"}>{props.fullName}</Text>
              <Text fontSize="small" color={"#CBD5E0"}>
                @{props.userName}
              </Text>
              <Text>{props.profil_description}</Text>
            </Box>
            <Box flex={1} display="flex" justifyContent={"flex-end"}>
              <Button
                ml={props.is_followed ? "125px" : "140px"}
                // ml={"180px"}
                mt={2}
                // justifyContent={"flex-end"}
                // paddingLeft={5}
                // paddingRight={5}
                borderRadius="15"
                h={7}
                colorScheme="white"
                variant="outline"
                onClick={() =>
                  handleFollow(props.id, props.id, props.is_followed)
                }
              >
                {props.is_followed ? "Unfollow" : "Follow"}
                {/* Fllow */}
              </Button>
            </Box>
        </Box>
      </>
    );
  }
  