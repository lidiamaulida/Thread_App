import { Avatar, Box, Image, Text, WrapItem } from "@chakra-ui/react";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IReply } from "../../../interface/Reply";
// import { useNavigate } from "react-router-dom";
import moment from "moment";

export function RepliesCard(props: IReply) {
  // const navigate: any = useNavigate();

  return (
    <>
      <Box>
        <WrapItem
          border="1px"
          pt={2}
          borderColor="#313131"
          flexDirection="column"
        >
          <Box ml={3} display="flex">
            <Avatar mr={3} name={props.fullName} src={props.profilePicture} />
            <Text mr={1} fontWeight="medium">
              {props.fullName}
            </Text>
            <Text>@{props.userName}</Text>
            <Text ml={1}>
              <FontAwesomeIcon style={{marginRight: "2px"}} width="6px" icon={faCircle} />
              {moment(props.posted_at).format("MMMM DD, YYYY ")}
            </Text>
          </Box>
          <Box p={3} mt={-6} ml="60px">
            <Text>{props.content}</Text>
          </Box>
          <Box p={3} ml="60px">
            {props.image && (
              <Image
                borderRadius="10px"
                objectFit="cover"
                src={props.image}
                alt="Chakra UI"
              />
            )}
          </Box>
        </WrapItem>
      </Box>
    </>
  );
}
