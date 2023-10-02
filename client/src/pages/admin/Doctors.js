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
import { message } from "antd";
import axios from "axios";

const Doctors = () => {
  const [doctor, setDoctor] = useState([]);

  const getDoctor = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/admin/gelAllDoctors",
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

  const handleAccountStatus = async (docData, status) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/admin/changeAccountStatus",
        { doctorId: docData._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.success) {
        message.success(data.message);
        window.location.reload();
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  useEffect(() => {
    getDoctor();
  }, []);

  return (
    <Layout>
      <Heading as="h3" size="lg" textAlign={"center"} mb={5}>
        All Doctors
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Status</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Specialization</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {doctor.map((docData, index) => (
              <Tr key={index}>
                <Td>
                  {docData.firstName} {docData.lastName}
                </Td>
                <Td>{docData.status}</Td>
                <Td>{docData.email}</Td>
                <Td>{docData.phone}</Td>
                <Td>{docData.specialization}</Td>
                <Td>
                  {docData.status === "pending" ? (
                    <Button
                      backgroundColor="#276749"
                      color="white"
                      onClick={() => handleAccountStatus(docData, "approved")}
                    >
                      Accept
                    </Button>
                  ) : (
                    <Button colorScheme="red">Reject</Button>
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

export default Doctors;
