import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Flex,
  Heading,
  Center,
} from "@chakra-ui/react";
import { message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        dispatch(showLoading());
        const { data } = await axios.post("/api/v1/user/login", values);
        window.location.reload();
        dispatch(hideLoading());
        if (data.success) {
          localStorage.setItem("token", data.token);
          message.success("Logged In Successfully");
          navigate("/");
        } else {
          message.error(data?.message);
        }
      } catch (error) {
        dispatch(hideLoading());
        console.log(`Something went wrong`);
      }
    },
  });

  return (
    <Box backgroundColor={"#e9e9e9"} minH={"100vh"}>
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        minH={"70px"}
        maxH={"100vh"}
        backgroundColor={"teal.800"}
        color={"white"}
      >
        <Heading
          fontSize={"1.5rem"}
          textAlign={"center"}
          background={"inherit"}
        >
          Medic Delight
        </Heading>
      </Flex>
      <Flex
        justifyContent={"center"}
        height={"auto"}
        mt={"5%"}
        backgroundColor={"#e9e9e9"}
      >
        <Box w={"34%"} p={5} border={"1px solid black"} borderRadius={"1rem"}>
          <Heading as="h3" textAlign={"center"} color="#234E52">
            Login Page
          </Heading>
          <form onSubmit={formik.handleSubmit}>
            <FormControl textAlign={"center"}>
              <FormLabel mt={4}>Email</FormLabel>
              <Input
                type="email"
                name="email"
                id="login_email"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
                background={"white"}
              />
              <FormLabel mt={4}>Password</FormLabel>
              <Input
                type="password"
                id="login_password"
                name="password"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                background={"white"}
              />
              <Center>
                <Button
                  mt={3}
                  display={"block"}
                  type="submit"
                  background="teal.300"
                >
                  Submit
                </Button>
              </Center>
              <Box mt={3}>
                <Link to="/register">
                  <b>Not a user? Register here</b>
                </Link>
              </Box>
            </FormControl>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default Login;
