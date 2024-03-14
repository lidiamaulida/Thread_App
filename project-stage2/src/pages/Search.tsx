import { Box } from "@chakra-ui/react";
import { FormSearch } from "../features/Search/component/Searchbar";

const Search = () => {
  return (
    <>
      <Box display="flex" w="100%" h="100vh" bg="black">
        <FormSearch />
      </Box>
    </>
  );
};

export default Search;
