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
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      secondPassword: "",
    },
    onSubmit: async (values) => {
      try {
        // const res = await axios({
        //   method: "post",
        //   url: "http://localhost:8080/api/v1/user/register",
        //   data: values,
        // }).then((apiResponse) => {
        //   console.log(`From axiios ${values}`);
        //   const products = apiResponse.data;
        //   res.json(products);
        // });
        dispatch(showLoading());
        const res = await axios.post("/api/v1/user/register", values);
        dispatch(hideLoading());
        if (res.data.success) {
          message.success("Registered Successfully");
          navigate("/login");
        } else {
          message.error(res.data?.message);
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

      <Flex justifyContent={"center"} height={"auto"} mt={"5%"}>
        <Box w={"34%"} p={5} border={"1px solid black"} borderRadius={"1rem"}>
          <Heading as="h3" textAlign={"center"} color="#234E52">
            Registration Page
          </Heading>
          <form onSubmit={formik.handleSubmit}>
            <FormControl textAlign={"center"}>
              <FormLabel mt={4}>Name</FormLabel>
              <Input
                type="name"
                name="name"
                id="register_name"
                placeholder="Your Name"
                onChange={formik.handleChange}
                value={formik.values.name}
                background={"white"}
              />
              <FormLabel mt={4}>Email</FormLabel>
              <Input
                type="email"
                id="register_email"
                name="email"
                placeholder="Email"
                onChange={formik.handleChange}
                value={formik.values.email}
                background={"white"}
              />
              <FormLabel mt={4}>Password</FormLabel>
              <Input
                type="password"
                id="register_password"
                name="password"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
                background={"white"}
              />
              <FormLabel mt={4}>Re-enter Password</FormLabel>
              <Input
                type="password"
                id="register_secondPassword"
                name="secondPassword"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.secondPassword}
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
                <Link to="/login">
                  <b>Already a user? Login here</b>
                </Link>
              </Box>
            </FormControl>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default Register;
