import React from "react";
import Layout from "../components/Layout";
import {
  TabList,
  TabPanels,
  Tabs,
  TabPanel,
  Tab,
  Heading,
  CardBody,
  Card,
  Text,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";

const NotificationPage = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const { data } = await axios.post(
        "/api/v1/user/get-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (data.success) {
        message.success(data.message);
        window.location.reload();
      } else {
        message.error(data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };
  const deleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const { data } = await axios.post(
        "/api/v1/user/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (data.success) {
        message.success(data.message);
        window.location.reload();
      } else {
        message.error(data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <Heading as="h4" size="lg" mb={5} textAlign={"center"} color="#234E52">
        Notification Page
      </Heading>
      <Tabs variant="enclosed">
        <TabList borderColor=" black">
          <Tab borderColor=" black">Un-Read</Tab>
          <Tab borderColor=" black">Read</Tab>
        </TabList>
        <TabPanels border="1px solid black">
          <TabPanel>
            <Heading
              as="h5"
              size="md"
              onClick={handleMarkAllRead}
              display={"flex"}
              justifyContent={"flex-end"}
              mb={3}
              color="#137200"
            >
              Mark as Read
            </Heading>
            {user?.notification.map((noti, index) => (
              <Card
                cursor={"pointer"}
                key={index}
                // onClick={() => navigate(noti.onClickPath)}
                border="1px solid #E2E8F0"
              >
                <CardBody>
                  <Text>{noti.message}</Text>
                </CardBody>
              </Card>
            ))}
          </TabPanel>

          <TabPanel>
            <Heading
              as="h5"
              size="md"
              onClick={deleteAllRead}
              display={"flex"}
              justifyContent={"flex-end"}
              mb={3}
              color="#ac0000"
            >
              Delete all Read
            </Heading>
            {user?.seenNotification.map((seenNoti, index) => (
              <Card
                cursor={"pointer"}
                key={index}
                onClick={() => navigate(seenNoti.onClickPath)}
                border="1px solid #E2E8F0"
              >
                <CardBody>
                  <Text>{seenNoti.message}</Text>
                </CardBody>
              </Card>
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Layout>
  );
};

export default NotificationPage;
