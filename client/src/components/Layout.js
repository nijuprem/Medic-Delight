import React from "react";
import { Box, Divider, Flex, HStack, Text } from "@chakra-ui/react";
import { AdminMenu, UserMenu } from "../data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoIosNotifications } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { message } from "antd";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logged Out Successfully");
    navigate("/login");
  };

  const SidebarMenu = user?.isAdmin ? AdminMenu : UserMenu;

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
                  <Box key={name} m={"12px 0"}>
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
              <Box m={"12px 0"} onClick={handleLogout}>
                <Link to="/login">
                  <HStack pl={3}>
                    <Box m={"0.7rem 0"}>
                      <LuLogOut size={"1.1rem"} />
                    </Box>
                    <Box m={"0.7rem 0"}>
                      <Text fontSize={"1.2rem"}>Logout</Text>
                    </Box>
                  </HStack>
                </Link>
              </Box>
            </Box>
          </Box>
          <Box w="100%" h="100%">
            <Box h="10vh" mb="20px">
              <HStack
                justifyContent={"flex-end"}
                mr={"10px"}
                textTransform={"capitalize"}
                fontSize={"1.2rem"}
              >
                <IoIosNotifications size={"1.5rem"} mr={"20px"} />
                <Link to="/profile">{user?.name}</Link>
              </HStack>
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
