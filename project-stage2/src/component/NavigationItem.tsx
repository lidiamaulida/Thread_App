// import React from "react";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import {
  AiFillHeart,
  AiFillHome,
  AiOutlineHeart,
  AiOutlineHome,
} from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Text,
  UnorderedList,
  WrapItem,
  Button,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  FormControl,
  Avatar,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { RiUserSearchFill, RiUserSearchLine } from "react-icons/ri";
import { FaCircleUser, FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "../store/types/RootTypes";
import { useLogin } from "../features/Auth/hooks/useLogin";

const Nav = () => {
  const auth = useSelector((state: RootState) => state.auth)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {handleLogout} = useLogin()
  const location = useLocation();

  return (
    <>
      <Box
        bg="black"
        w="320px"
        p={3}
        height="100%"
        borderRight="1px"
        borderColor="#313131"
        color="white"
        // top="0"
        // left="0"
        // bottom="0"
      >
        <Text
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="5xl"
          fontWeight="extrabold"
          ml={9}
        >
          Circle
        </Text>
        <UnorderedList>
          <Link to={"/"}>
            <Box fontSize="3xl" display="flex" m={5}>
              {location.pathname === "/" ? <AiFillHome /> : <AiOutlineHome />}
              <Text
                fontSize="20px"
                fontWeight={location.pathname === "/" ? "bold" : "medium"}
                ml={5}
              >
                Home
              </Text>
            </Box>
          </Link>
          <Link to="/search">
            <Box fontSize="2xl" display="flex" m={5} ml={6} mt={6}>
              {location.pathname === "/search" ? (
                <RiUserSearchFill />
              ) : (
                <RiUserSearchLine />
              )}
              <Text
                fontSize="20px"
                fontWeight={location.pathname === "/search" ? "bold" : "medium"}
                ml={5}
              >
                Search
              </Text>
            </Box>
          </Link>
          <Link to="/follows">
            <Box fontSize="2xl" display="flex" m={5} ml={6} mt={6}>
              {location.pathname === "/follows" ? (
                <AiFillHeart />
              ) : (
                <AiOutlineHeart />
              )}
              <Text
                fontSize="20px"
                fontWeight={
                  location.pathname === "/follows" ? "bold" : "medium"
                }
                ml={5}
              >
                Follows
              </Text>
            </Box>
          </Link>
          <Link to="/profile">
            <Box fontSize="2xl" display="flex" m={5} ml={6} mt={6}>
              {location.pathname === "/profile" ? (
                <FaCircleUser />
              ) : (
                <FaRegCircleUser />
              )}
              <Text
                fontSize="20px"
                fontWeight={
                  location.pathname === "/profile" ? "bold" : "medium"
                }
                ml={5}
              >
                Profile
              </Text>
            </Box>
          </Link>
          <WrapItem>
            <Button
              onClick={onOpen}
              colorScheme="pink"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              width="55%"
              mt={4}
              ml={3}
              borderRadius="20"
            >
              Create Post
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent bg="#262626" color="white" borderRadius="15px">
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <WrapItem
                    mt={6}
                    p={2}
                    fontSize="2xl"
                    display="flex"
                    borderBottom="1px"
                    borderColor="#313131"
                  >
                    <FormControl margin="3">
                      <Avatar
                        size="md"
                        mt={-2}
                        name={auth.profil_picture ? auth.fullName : ""}
                        src={auth.profil_picture}
                      />
                      <Input
                        ml={3}
                        mt={1}
                        mr={3}
                        width="60%"
                        variant="unstyled"
                        placeholder="What is happening?"
                      />
                      <FontAwesomeIcon icon={faImage} />
                    </FormControl>
                  </WrapItem>
                </ModalBody>
                <ModalFooter>
                  <Button
                    mb="2"
                    colorScheme="pink"
                    bgGradient="linear(to-l, #7928CA, #FF0080)"
                    borderRadius="20px"
                    mr={3}
                  >
                    Reply
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </WrapItem>
        </UnorderedList>
        <button onClick={() => {handleLogout()}}>
        <Box position="fixed" bottom="55" ml={8} display="flex">
          <Center>
            <CiLogout />
            <Text ml="3px"> Logout</Text>
          </Center>
        </Box>
        </button>
      </Box>
    </>
  );
};

export default Nav;
