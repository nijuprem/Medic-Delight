import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, Heading } from "@chakra-ui/react";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import dayjs from "dayjs";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Update Doctor

  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/doctor/updateProfile",
        {
          ...values,
          userId: user._id,
          timings: [
            dayjs(values?.timings[0]).format("HH:mm"),
            dayjs(values?.timings[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing Went Wrrong ");
    }
  };

  const getDoctorInfo = async () => {
    try {
      const { data } = await axios.post(
        "/api/v1/doctor/getDoctorInfo",
        { userId: params.id },
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

  useEffect(() => {
    getDoctorInfo();
    // eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <Heading as="h1" textAlign={"center"} color="#234E52">
        Manage Profile
      </Heading>
      {doctor && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            ...doctor,
            timings: [
              dayjs(doctor.timings[0], "HH:mm"),
              dayjs(doctor.timings[1], "HH:mm"),
            ],
          }}
        >
          <Box boxShadow={"2px 4px 8px black"} p={5} mt={3}>
            <Heading as="h4" size="lg" mt={5} mb={4}>
              Personal Details :{" "}
            </Heading>
            <Row gutter={20}>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  required
                  rules={[
                    { required: true, message: "First Name is required" },
                  ]}
                >
                  <Input type="text" placeholder="Your first name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  required
                  rules={[{ required: true, message: "Last Name is required" }]}
                >
                  <Input type="text" placeholder="Your last name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Phone No"
                  name="phone"
                  required
                  rules={[{ required: true, message: "Phone No is required" }]}
                >
                  <Input type="text" placeholder="Your contact no" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Email"
                  name="email"
                  required
                  rules={[{ required: true, message: "Email is required" }]}
                >
                  <Input type="email" placeholder="Your email address" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item label="Website" name="website">
                  <Input type="text" placeholder="Your website" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Address"
                  name="address"
                  required
                  rules={[{ required: true, message: "Address is required" }]}
                >
                  <Input type="text" placeholder="Your clinic address" />
                </Form.Item>
              </Col>
            </Row>
          </Box>
          <Box boxShadow={"2px 4px 8px black"} p={5} mt={3}>
            <Heading as="h4" size="lg" mt={5} mb={4}>
              Professional Details :
            </Heading>
            <Row gutter={20}>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Specialization"
                  name="specialization"
                  required
                  rules={[
                    { required: true, message: "Specialization is required" },
                  ]}
                >
                  <Input type="text" placeholder="Your specialization" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Experience"
                  name="experience"
                  required
                  rules={[
                    { required: true, message: "Experience is required" },
                  ]}
                >
                  <Input type="text" placeholder="Your experience" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Fees Per Consultation"
                  name="feesPerConsultation"
                  required
                  rules={[{ required: true, message: "Fees is required" }]}
                >
                  <Input type="text" placeholder="Your contact no" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item label="Timings" name="timings" required>
                  <TimePicker.RangePicker format="HH:mm" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}></Col>
              <Col xs={24} md={24} lg={8}>
                <button className="btn btn-primary form-btn" type="submit">
                  <Box
                    mt={{ lg: "1.5rem" }}
                    backgroundColor="teal.800"
                    w="fit-content"
                    p={3}
                    borderRadius={5}
                    color={"white"}
                  >
                    Update
                  </Box>
                </button>
              </Col>
            </Row>
          </Box>
        </Form>
      )}
    </Layout>
  );
};

export default Profile;
