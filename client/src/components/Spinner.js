import React from "react";
import { Box, Spinner as SpinnerUI } from "@chakra-ui/react";

const Spinner = () => {
  return (
    <Box position={"absolute"} top={"40vh"} left="50%">
      <SpinnerUI
        thickness="6px"
        speed="0.7s"
        emptyColor="gray.200"
        color="teal.500"
        h="5rem"
        w="5rem"
        zIndex={100}
      />
    </Box>
  );
};

export default Spinner;
