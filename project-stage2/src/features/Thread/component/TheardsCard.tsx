import { IThreadCard } from "../../../interface/Thread";
import { Box, Avatar, Text, Image, WrapItem, Center } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { useThreadCard } from "../hooks/useThreadLike";
import moment from "moment"

export function ThreadCard(props: IThreadCard) {
  const navigate = useNavigate()
  const { handlePostLike } = useThreadCard();

  return (
    <>
      <Box key={props.id}>
        <WrapItem
          //  bg='purple'
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
            <Text ml={1} color={"#CBD5E0"}>
              <FontAwesomeIcon width="6px" style={{marginRight: "3px"}} icon={faCircle}/> 
              {moment(props.postedAt).format("MMMM DD, YYYY ")}
            </Text>
          </Box>
          <Box p={3} mt={-6} ml="60px">
            <Text>{props.content}</Text>
          </Box>
          <Box p={5} ml="50px">
            {props.image && ( // Tambahkan pengecekan kondisi di sini
              <Image
                borderRadius="10px"
                objectFit="cover"
                src={props.image}
                alt="Chakra UI"
              />
            )}
          </Box>
          <Box ml="70px" mb={2} display="flex">
            <Center>
              <button style={{}}
                onClick={() => handlePostLike(props.id, props.is_liked)}
              >
                <FontAwesomeIcon
                  color={props.is_liked ? "red" : "inherit"}
                  // color="inherit"
                  icon={faHeart}
                />
              </button>
              <Text color="#CBD5E0" ml={2} mr={2} mt={-1}>
                {props.likesCount}
              </Text>
              <button onClick={() => navigate(`/thread/${props.id}`)}>
              <FontAwesomeIcon icon={faComment} />
              </button>
              <Text color="#CBD5E0" ml={2} mt={-1}>
                {props.repliesCount}
              </Text>
            </Center>
          </Box>
        </WrapItem>
      </Box>
    </>
  );
}
