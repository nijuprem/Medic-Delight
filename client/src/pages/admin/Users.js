import React from "react";
import Layout from "../../components/Layout";
import { Heading } from "@chakra-ui/react";

const Users = () => {
  return (
    <Layout>
      <Heading as="h3" size="lg" textAlign={"center"}>
        Users List
      </Heading>
    </Layout>
  );
};

export default Users;
