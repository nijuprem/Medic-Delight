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

const Users = () => {
  const [user, setUser] = useState([]);

  const getUser = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/admin/gelAllUsers",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.success) {
        setUser(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Layout>
      <Heading as="h3" size="lg" textAlign={"center"} mb={5}>
        Users List
      </Heading>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Doctor</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {user.map((userData, index) => (
              <Tr key={index}>
                <Td>{userData.name}</Td>
                <Td>{userData.email}</Td>
                <Td>{userData.isDoctor ? "Yes" : "No"}</Td>
                <Td>
                  <Button colorScheme="red">Block</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default Users;
