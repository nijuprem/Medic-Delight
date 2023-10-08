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
      const { data } = await axios.get("/api/v1/admin/gelAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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
      <Heading as="h3" size="lg" textAlign={"center"} mb={5} color="#234E52">
        Users List
      </Heading>
      <TableContainer
        boxShadow={"2px 1px 12px black"}
        mt={5}
        border="1px solid black"
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th borderColor={"black"}>Name</Th>
              <Th borderColor={"black"}>Email</Th>
              <Th borderColor={"black"}>Doctor</Th>
              <Th borderColor={"black"}>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {user.map((userData, index) => (
              <Tr key={index}>
                <Td borderColor={"black"}>{userData.name}</Td>
                <Td borderColor={"black"}>{userData.email}</Td>
                <Td borderColor={"black"}>
                  {userData.isDoctor ? "Yes" : "No"}
                </Td>
                <Td borderColor={"black"}>
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
