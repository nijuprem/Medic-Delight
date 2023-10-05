import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, TimePicker } from "antd";
import dayjs from "dayjs";

const BookingPage = () => {
  const params = useParams();
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isAvailable, setIsAvailable] = useState();

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
        Booking Page
      </Heading>
      {doctor && (
        <Box p={"1rem"}>
          <Text size="lg" mt={3}>
            Dr: {doctor.firstName} {doctor.lastName}
          </Text>
          <Text size="lg" mt={3}>
            Fees: {doctor.feesPerConsultation}
          </Text>
          <Text size="lg" mt={3}>
            Timings: {doctor.timings[0]} to {doctor.timings[1]}
          </Text>
          <Flex w="25%" flexDir={"column"} mt={3}>
            <DatePicker
              format="DD-MM-YYYY"
              onChange={(date) => setDate(dayjs(date).format("DD-MM-YYYY"))}
            />
            <Box mt={3} />
            <TimePicker.RangePicker
              format="HH:mm"
              onChange={(time) =>
                setTime([
                  dayjs(time[0]).format("HH:mm"),
                  dayjs(time[1]).format("HH:mm"),
                ])
              }
            />
            <Button backgroundColor="teal.300" mt={3}>
              Check Availability
            </Button>
          </Flex>
        </Box>
      )}
    </Layout>
  );
};

export default BookingPage;
