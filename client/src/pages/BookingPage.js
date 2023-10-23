import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, TimePicker, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const BookingPage = () => {
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);

  const dispatch = useDispatch();

  const getSingleDoctor = async () => {
    try {
      const { data } = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { docId: params.doctorId },
   /*     {
          headers: {
            'Content-Type': 'application-json',
          },
        }*/
      );
      if (data.success) {
        setDoctor(data.data);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date && !time) {
        return alert("Date & Time Required");
      }
      dispatch(showLoading());
      const { data } = await axios.post(
        "/api/v1/user/bookAppointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
        },
   /*     {
          headers: {
            'Content-Type': 'application-json',
          },
        }*/
      );
      dispatch(hideLoading());
      if (data.success) {
        message.success(data.message);
        setDoctor(data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      // console.log(error);
    }
  };

  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const { data } = await axios.post(
        "/api/v1/user/bookingAvailability",
        { doctorId: params.doctorId, date: date, time: time },
   /*     {
          headers: {
            'Content-Type': 'application-json',
          },
        }*/
      );
      dispatch(hideLoading());
      if (data.success) {
        setIsAvailable(true);
        // console.log(isAvailable);
        message.success(data.message);
      } else {
        message.error(data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      // console.log(error);
    }
  };

  useEffect(() => {
    getSingleDoctor();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <Heading as="h1" textAlign={"center"} color="#234E52">
        Booking Page
      </Heading>
      {doctor && (
        <Flex justifyContent={"center"} mt={5}>
          <Card
            maxW="sm"
            minW="sm"
            boxShadow={"5px 5px 9px black"}
            border="1px solid black"
            p={5}
          >
            <CardBody>
              <Stack spacing="3">
                <Heading size="md" textAlign={"center"}>
                  <b>Dr:</b> {doctor.firstName} {doctor.lastName}
                </Heading>
                <Text></Text>
                <Text fontSize="xl">
                  <b>Fees:</b> {doctor.feesPerConsultation}
                </Text>
                <Text fontSize="xl" mb={2}>
                  <b>Timings:</b> {doctor.timings[0]} to {doctor.timings[1]}
                </Text>
                {/* <Flex w="25%" flexDir={"column"} mt={3}> */}
                <DatePicker
                  format="DD-MM-YYYY"
                  onChange={(date) => {
                    // setIsAvailable(false);
                    setDate(date);
                  }}
                />
                <Box mt={1} />
                <TimePicker
                  format="HH:mm"
                  onChange={(time) => {
                    // setIsAvailable(false);
                    setTime(time);
                  }}
                />
                {/* </Flex> */}
              </Stack>
            </CardBody>

            <ButtonGroup spacing="2" display={"flex"} justifyContent={"center"}>
              <Button
                backgroundColor="teal.300"
                mt={3}
                _hover={{ backgroundColor: "teal.500" }}
                onClick={handleAvailability}
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
            </ButtonGroup>
          </Card>

          {/* <Box p={"1rem"} border="2px solid red">
            <Text size="lg" mt={3}>
              <b>Dr:</b> {doctor.firstName} {doctor.lastName}
            </Text>
            <Text size="lg" mt={3}>
              <b>Fees:</b> {doctor.feesPerConsultation}
            </Text>
            <Text size="lg" mt={3}>
              <b>Timings:</b> {doctor.timings[0]} to {doctor.timings[1]}
            </Text>
            <Flex w="25%" flexDir={"column"} mt={3}>
              <DatePicker
                format="DD-MM-YYYY"
                onChange={(date) => {
                  // setIsAvailable(false);
                  setDate(date);
                }}
              />
              <Box mt={3} />
              <TimePicker
                format="HH:mm"
                onChange={(time) => {
                  // setIsAvailable(false);
                  setTime(time);
                }}
              />
              <Button
                backgroundColor="teal.300"
                mt={3}
                _hover={{ backgroundColor: "teal.500" }}
                onClick={handleAvailability}
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
          </Box> */}
        </Flex>
      )}
    </Layout>
  );
};

export default BookingPage;
