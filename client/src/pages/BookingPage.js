import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookingPage = () => {
  const params = useParams();
  const [doctor, setDoctor] = useState(null);

  const getSingleDoctor = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/doctor/getDoctorById",
        { docId: params.doctorId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.success) {
        setDoctor(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleDoctor();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <Heading as="h1" textAlign={"center"}>
        BookingPage
      </Heading>
      {doctor && (
        <>
          <Text size="lg">
            Dr: {doctor.firstName} {doctor.lastName}
          </Text>
          <Text size="lg">Fees: {doctor.feesPerConsultation}</Text>
          <Text size="lg">
            Timings: {doctor.timings[0]} to {doctor.timings[1]}
          </Text>
        </>
      )}
    </Layout>
  );
};

export default BookingPage;
