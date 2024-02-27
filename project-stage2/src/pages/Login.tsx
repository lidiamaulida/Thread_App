import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useLogin } from "../hooks/useLogin";
import { useSelector } from "react-redux";
import { RootState } from "../store/types/RootTypes";

export default function Login() {
  const { handleChange, handleSubmit } = useLogin()
  const auth = useSelector((state: RootState) => state.auth)
  console.log(auth, "test");
  
  return (
    <>
      <Box
        display="flex"
        w="100%"
        h="100vh"
        bg="black"
        justifyContent="center"
        alignItems="center"
      >
        <Box flexDirection="column" width="500px" color="white">
          <Text
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontSize="4xl"
            fontWeight="extrabold"
          >
            Circle
          </Text>
          <Text color="white" fontSize="20px" fontWeight="bold">
            Login to Cricle
          </Text>
          <Box mt="3" flexDirection="column">
            <Input mb="3" name="email" placeholder="Email" onChange={handleChange}/>
            <Input mb="2" type="password" name="password" placeholder="Pssword" onChange={handleChange}/>
            <Text mb="2" textAlign="end">Forget Password?</Text>
            <Button
              colorScheme="pink"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              borderRadius="18px"
              width="500px"
              mb="3"
              onClick={handleSubmit}
            >
              Login
            </Button>
            <Box display="flex">
              <Text>Don't have an accounct yet?</Text>
              <Text
                ml="1"
                color="pink"
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
              >
                Create account
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
