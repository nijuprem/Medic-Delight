import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const params = useParams();

  const getDoctorInfo = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/doctor/getDoctorInfo",
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
    // eslint - disable - next - line;
  }, []);
  return (
    <Layout>
      <h1>Manage Profile</h1>
    </Layout>
  );
};

export default Profile;
