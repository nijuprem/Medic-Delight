import React from "react";
import Layout from "../../components/Layout";
import { Heading } from "@chakra-ui/react";

const Doctors = () => {
  return (
    <Layout>
      <Heading as="h3" size="lg" textAlign={"center"}>
        All Doctors
      </Heading>
    </Layout>
  );
};

export default Doctors;
