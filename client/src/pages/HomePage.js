import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Heading } from "@chakra-ui/react";
import { Row } from "antd";
import DoctorList from "./DoctorList";

const HomePage = () => {
  const [doctor, setDoctor] = useState([]);

  const getUserData = async () => {
    try {
      const { data } = await axios.get("/api/v1/user/getAllDoctors", 
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
      )
      ;
      if (data.success) {
        setDoctor(data.data);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Layout>
        <Heading as="h3" textAlign={"center"} color="#234E52">
          Home Page
        </Heading>
        <Row>
          {doctor &&
            doctor.map((doctor, index) => (
              <DoctorList key={index} doctor={doctor} />
            ))}
        </Row>
      </Layout>
    </>
  );
};

export default HomePage;
