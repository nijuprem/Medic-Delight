import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, TimePicker, message } from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  // const [isAvailable, setIsAvailable] = useState();

  const dispatch = useDispatch();

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

  const handleBooking = async () => {
    try {
      dispatch(showLoading());
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/user/bookAppointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (data.success) {
        message.success(data.message);
        setDoctor(data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
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
            <Button
              backgroundColor="teal.300"
              mt={3}
              _hover={{ backgroundColor: "teal.500" }}
            >
              Check Availability
            </Button>
            <Button
              backgroundColor="gray.800"
              color="white"
              mt={3}
              _hover={{ backgroundColor: "gray.700" }}
              onClick={handleBooking}
            >
              Book Now
            </Button>
          </Flex>
        </Box>
      )}
    </Layout>
  );
};

export default BookingPage;
