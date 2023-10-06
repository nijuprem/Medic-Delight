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
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import dayjs from "dayjs";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/user/userAppointments",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.success) {
        setAppointments(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <Layout>
      <Heading as="h1" textAlign={"center"} mb={3}>
        Appointments List
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Date & Time</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {appointments.map(({ userId, status, date, time }, index) => (
              <Tr key={index}>
                <Td>{userId}</Td>
                {/* <Td>
                  {date}
                  {time}
                </Td> */}
                <Td>
                  {dayjs(date).format("DD-MM-YYYY")}{" "}
                  {dayjs(time).format("HH:mm")}
                </Td>
                <Td>{status}</Td>
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
