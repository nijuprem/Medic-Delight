import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  Heading,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Table,
} from "@chakra-ui/react";
import axios from "axios";
import dayjs from "dayjs";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const { data } = await axios.get("/api/v1/user/userAppointments", 
      // {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      // }
      );
      if (data.success) {
        setAppointments(data.data);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <Layout>
      <Heading as="h1" textAlign={"center"} mb={3} color="#234E52">
        Appointments List
      </Heading>
      <TableContainer
        border="2px solid black"
        boxShadow={"2px 1px 12px black"}
        mt={5}
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th borderColor="black">ID</Th>
              <Th borderColor="black">Date & Time</Th>
              <Th borderColor="black">Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {appointments.map(({ userId, status, date, time }, index) => (
              <Tr key={index}>
                <Td borderColor="black">{userId}</Td>
                {/* <Td>
                  {date}
                  {time}
                </Td> */}
                <Td borderColor="black">
                  {dayjs(date).format("DD-MM-YYYY")}{" "}
                  {dayjs(time).format("HH:mm")}
                </Td>
                <Td borderColor="black">{status}</Td>
                {/* <Td>
                  <Button colorScheme="red">Reject</Button>
                </Td> */}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default Appointments;
