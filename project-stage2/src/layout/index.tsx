import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";
import Nav from "../component/NavigationItem";
import Profile from "../component/Profile";

export default function Main({ children }: { children: ReactNode }) {
  return (
    <>
    <Box display="flex" h="100vh">
      <Box display={"flex"} justifyContent={"start"}>
        <Nav />
      </Box>

      {children}

      <Box display={"flex"} flexDirection={"column"} justifyContent={"end"}>
        <Profile />
      </Box>
    </Box>
    </>
  );
}
