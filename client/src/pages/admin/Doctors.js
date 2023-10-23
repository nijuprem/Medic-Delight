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
      const { data } = await axios.get("/api/v1/admin/gelAllDoctors", 
      // {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("token")}`,
      //   },
      // }
      );
      if (data.success) {
        setDoctor(data.data);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const handleAccountStatus = async (docData, status) => {
    try {
      const { data } = await axios.post(
        "/api/v1/admin/changeAccountStatus",
        { doctorId: docData._id, status: status },
   /*     {
          headers: {
            'Content-Type': 'application-json',
          },
        }*/
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
      <Heading as="h3" size="lg" textAlign={"center"} mb={5} color="#234E52">
        All Doctors
      </Heading>
      <TableContainer boxShadow={"2px 1px 12px black"} mt={5}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th borderColor={"black"}>Name</Th>
              <Th borderColor={"black"}>Status</Th>
              <Th borderColor={"black"}>Email</Th>
              <Th borderColor={"black"}>Phone</Th>
              <Th borderColor={"black"}>Specialization</Th>
              <Th borderColor={"black"}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {doctor.map((docData, index) => (
              <Tr key={index}>
                <Td borderColor={"black"}>
                  {docData.firstName} {docData.lastName}
                </Td>
                <Td borderColor={"black"}>{docData.status}</Td>
                <Td borderColor={"black"}>{docData.email}</Td>
                <Td borderColor={"black"}>{docData.phone}</Td>
                <Td borderColor={"black"}>{docData.specialization}</Td>
                <Td borderColor={"black"}>
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
