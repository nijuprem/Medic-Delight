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
import { Link } from "react-router-dom";
import { useFormik } from "formik";

const Register = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      secondPassword: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Flex justifyContent={"center"} height={"auto"} mt={"5%"}>
      <Box w={"34%"} p={5} border={"1px solid black"} borderRadius={"1rem"}>
        <Heading as="h3" textAlign={"center"}>
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
            />
            <FormLabel mt={4}>Email</FormLabel>
            <Input
              type="email"
              id="register_email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <FormLabel mt={4}>Password</FormLabel>
            <Input
              type="password"
              id="register_password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <FormLabel mt={4}>Re-enter Password</FormLabel>
            <Input
              type="password"
              id="register_secondPassword"
              name="secondPassword"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.secondPassword}
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
              <Link to="/login">Already a user? Login here</Link>
            </Box>
          </FormControl>
        </form>
      </Box>
    </Flex>
  );
};

export default Register;