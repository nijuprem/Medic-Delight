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
      const { data } = await axios.get("/api/v1/doctor/DrAppointments", 
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

  const handleStatus = async (record, status) => {
    try {
      const { data } = await axios.post(
        "/api/v1/doctor/updateStatus",
        { appointmentsId: record._id, status },
   /*     {
          headers: {
            'Content-Type': 'application-json',
          },
        }*/
      );
      if (data.success) {
        await message.success(data.message);
        getAppointments();
      }
    } catch (error) {
      // console.log(error);
      message.error("Something Went Wrong");
    }
  };

  return (
    <Layout>
      <Heading as="h1" textAlign={"center"} mb={3} color="#234E52">
        Appointments List
      </Heading>
      <TableContainer boxShadow={"2px 1px 12px black"} mt={5}>
        <Table variant="simple" border={"1px solid black"}>
          <Thead>
            <Tr>
              <Th borderColor={"black"}>ID</Th>
              <Th borderColor={"black"}>Date & Time</Th>
              <Th borderColor={"black"}>Status</Th>
              <Th borderColor={"black"}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {appointments.map((record, index) => (
              <Tr key={index}>
                <Td borderColor={"black"}>{record.userId}</Td>
                {/* <Td>
                      {date}
                      {time}
                    </Td> */}
                <Td borderColor={"black"}>
                  {dayjs(record.date).format("DD-MM-YYYY")}{" "}
                  {dayjs(record.time).format("HH:mm")}
                </Td>
                <Td borderColor={"black"}>{record.status}</Td>
                <Td borderColor={"black"}>
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
                        onClick={() => handleStatus(record, "rejected")}
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
