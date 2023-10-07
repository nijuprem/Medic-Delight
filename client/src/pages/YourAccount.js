import React from "react";
import Layout from "../components/Layout";
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import axios from "axios";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useParams } from "react-router-dom";

const YourAccount = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: user?.email,
      oldpassword: "",
      password: "",
      secondPassword: "",
    },
    onSubmit: async (values) => {
      try {
        dispatch(showLoading());
        const { data } = await axios.post(
          "http://localhost:8080/api/v1/user/userAccounts",
          values,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());
        if (data.success) {
          message.success(data.message);
        } else {
          message.error(data.message);
        }
      } catch (error) {
        dispatch(hideLoading());
        console.log(`Something went wrong`);
      }
    },
  });

  return (
    <Layout>
      <Heading as="h1" textAlign={"center"}>
        Your Account
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
          />
          <FormLabel mt={4}>Old Password</FormLabel>
          <Input
            type="password"
            id="old_password"
            name="oldpassword"
            placeholder="Old Password"
            onChange={formik.handleChange}
            value={formik.values.oldpassword}
          />
          <FormLabel mt={4}>Password</FormLabel>
          <Input
            type="password"
            id="login_password"
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
        </FormControl>
      </form>
    </Layout>
  );
};

export default YourAccount;
