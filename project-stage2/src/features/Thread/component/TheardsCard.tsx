import React from "react";
import { useNavigate } from "react-router-dom";
import { IThreadCard } from "../../../interface/Thread";
import { Box, Avatar, Text, Image, WrapItem, Center } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
// import { API } from "../libs/api";
// import FakeData from "../mocks/Thread.json";

export function ThreadCard(props: IThreadCard) {
  const navigate: any = useNavigate();
  // console.log(typeof navigate);
  const [liked, setLiked] = React.useState(false);
  const [likes, setLikes] = React.useState()

  
  
    // async function getThread() {
    //     try {
    //       const response = await API.get('/threads')

    //       return response.data
    //     } catch (error) {
    //       throw error
    //     }
    // }
  
    // React.useEffect(() => {
    //   const data = getThread().then((data) => console.log(data))

    //   console.log(data);
    // }, [])
  
  // const countLike = () => {
  //  if (liked) {
  //   setLikes(likes - 1)
  //  } else {
  //   setLikes(likes + 1)
  //  }
  //  setLiked(!liked)
  // }

  return (
    <>
      <Box key={props.id}>
        <Link to={`/thread/${props.id}`}>
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
            <Text ml={1}>
              <FontAwesomeIcon width="6px" icon={faCircle} /> 
              {props.posted_at}
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
              <button>
                <FontAwesomeIcon
                  color={liked ? "red" : "inherit"}
                  icon={faHeart}
                />
              </button>
              <Text color="#CBD5E0" ml={2} mr={2} mt={-1}>
                {props.likesCount}
              </Text>
              <FontAwesomeIcon icon={faComment} />
              <Text color="#CBD5E0" ml={2} mt={-1}>
                {props.repliesCount}
              </Text>
            </Center>
          </Box>
        </WrapItem>
        </Link>
      </Box>
    </>
  );
}
