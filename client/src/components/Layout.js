import React from "react";
import { Badge, Box, Divider, Flex, HStack, Text } from "@chakra-ui/react";
import { AdminMenu, UserMenu, DoctorMenu } from "../data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoIosNotifications } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { message } from "antd";
import axios from 'axios'

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{const {data} = await axios.post('/api/v1/user/logout',{},
    // {
    //   headers: {
    //     'Content-Type': 'application-json',
    //   },
    // }
    )
    localStorage.clear();
    if (data.success) {
    message.success("Logged Out successfully");
    navigate("/login");
    }
    else{
      message.error(data.message);
      navigate("/login");
    }
  }catch(error){
      console.log('Error : ', error);
    }
  };

  const SidebarMenu = user?.isAdmin
    ? AdminMenu
    : user?.isDoctor
    ? DoctorMenu
    : UserMenu;

  return (
    <>
      <Box minH={"100%"} backgroundColor={"#e9e9e9"}>
        <Flex minH={"100vh"}>
          <Box
            minH={"100%"}
            w={"300px"}
            // borderRadius={"5px"}
            backgroundColor={"teal.800"}
            // mr={"20px"}
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
                    <Link
                      to={
                        user?.isDoctor === false
                          ? path
                          : name === "Profile"
                          ? `${path}/${user?._id}`
                          : path
                      }
                    >
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
            <Flex
              justifyContent={"flex-end"}
              minH={"56px"}
              maxH={"100vh"}
              // mb="20px"
              backgroundColor={"teal.800"}
              color={"white"}
            >
              <HStack
                justifyContent={"flex-end"}
                mr={"20px"}
                textTransform={"capitalize"}
                fontSize={"1.2rem"}
              >
                <HStack
                  cursor={"pointer"}
                  onClick={() => navigate("/notification")}
                >
                  <IoIosNotifications size={"1.5rem"} mr={"20px"} />
                  <Badge colorScheme="red" ml={"-5px"}>
                    {user?.notification.length}
                  </Badge>
                </HStack>
                <Link to="/account">{user?.name}</Link>
              </HStack>
            </Flex>
            <Box minH="100%" p={5}>
              {children}
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Layout;
