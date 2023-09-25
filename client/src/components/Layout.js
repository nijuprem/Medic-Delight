import React from "react";
import { Box, Divider, Flex, HStack, Text } from "@chakra-ui/react";
import { SidebarMenu } from "../data/data";
import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  return (
    <>
      <Box minH={"100%"}>
        <Flex minH={"100vh"} p={5}>
          <Box
            minH={"100%"}
            w={"300px"}
            borderRadius={"5px"}
            backgroundColor={"teal.800"}
            mr={"20px"}
          >
            <Box color={"white"} m={"10px 0"}>
              <Text fontSize={"1.5rem"} textAlign={"center"}>
                Medic Delight
              </Text>
            </Box>
            <Divider />
            <Box color={"white"} fontSize={"1rem"} mt={10}>
              {SidebarMenu.map(({ name, path, icon }) => {
                const isActive = location.pathname === path;
                return (
                  <Box m={"12px 0"}>
                    <Link to={path}>
                      <HStack
                        pl={3}
                        backgroundColor={`${isActive && "#700000"}`}
                      >
                        <Box m={"0.7rem 0"}>{icon}</Box>
                        <Box m={"0.7rem 0"}>
                          <Text fontSize={"1.2rem"}>{name}</Text>
                        </Box>
                      </HStack>
                    </Link>
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Box w="100%" h="100%">
            <Box h="10vh" mb="20px" border="2px solid red">
              Header
            </Box>
            <Box border="2px solid red" minH="100%">
              {children}
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Layout;
