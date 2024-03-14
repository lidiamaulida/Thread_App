import { Box, Button, Input, Text } from "@chakra-ui/react";
import { useRegister } from "../features/Auth/hooks/useRegister";

export default function Register() {
  const { handleChange, handleSubmit } = useRegister();
  
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
            Create account Circle
          </Text>
          <Box mt="3" flexDirection="column">
            <Input mb="3" name="fullName" placeholder="Fullname" onChange={handleChange}/>
            <Input mb="3" name="email" placeholder="Email" onChange={handleChange}/>
            <Input mb="3" name="password" type="password" placeholder="Pssword" onChange={handleChange}/>
            <Button
              colorScheme="pink"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              borderRadius="18px"
              width="500px"
              mb="3"
              onClick={handleSubmit}
            >
              Create
            </Button>
            <Box display="flex">
              <Text>Already have account?</Text>
              <Text
                ml="1"
                color="pink"
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
              >
                Login
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
