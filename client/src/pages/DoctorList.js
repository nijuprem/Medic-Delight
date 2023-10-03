import { Box, Card, CardBody, CardHeader, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <>
      <Card
        maxW="sm"
        minW={"23%"}
        m={5}
        cursor={"pointer"}
        onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
      >
        <CardHeader
          backgroundColor={"#700000"}
          color="white"
          p={2}
          textAlign={"center"}
        >
          Dr. {doctor.firstName} {doctor.lastName}
        </CardHeader>

        <CardBody>
          <Box>
            <Text mb={4}>
              <b>Specialization: </b> {doctor.specialization}
            </Text>
            <Text mb={4}>
              <b>Experience: </b> {doctor.experience}
            </Text>
            <Text mb={4}>
              <b>Fees Per Consultation: </b> {doctor.feesPerConsultation}
            </Text>
            <Text mb={4}>
              <b>Timings: </b> {doctor.timings[0]} - {doctor.timings[1]}
            </Text>
          </Box>
        </CardBody>
      </Card>
    </>
  );
};

export default DoctorList;
