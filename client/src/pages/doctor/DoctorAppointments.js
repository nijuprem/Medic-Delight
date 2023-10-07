import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
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
import { message } from "antd";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const { data } = await axios.get("/api/v1/doctor/DrAppointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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

  const handleStatus = async (record, status) => {
    try {
      const { data } = await axios.post(
        "/api/v1/doctor/updateStatus",
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.success) {
        await message.success(data.message);
        getAppointments();
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

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
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {appointments.map((record, index) => (
              <Tr key={index}>
                <Td>{record.userId}</Td>
                {/* <Td>
                      {date}
                      {time}
                    </Td> */}
                <Td>
                  {dayjs(record.date).format("DD-MM-YYYY")}{" "}
                  {dayjs(record.time).format("HH:mm")}
                </Td>
                <Td>{record.status}</Td>
                <Td>
                  {record.status === "pending" && (
                    <>
                      <Button
                        mr={3}
                        background="teal.800"
                        color="white"
                        onClick={() => handleStatus(record, "approved")}
                      >
                        Approve
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => handleStatus(record, "reject")}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default DoctorAppointments;
