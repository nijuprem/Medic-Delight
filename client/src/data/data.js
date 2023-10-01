import { BiSolidHome } from "react-icons/bi";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";

export const UserMenu = [
  {
    name: "Home",
    path: "/",
    icon: <BiSolidHome size={"1.3rem"} />,
  },
  {
    name: "Appointments",
    path: "/appointments",
    icon: <AiOutlineUnorderedList size={"1.3rem"} />,
  },
  {
    name: "Apply Doctor",
    path: "/apply-doctor",
    icon: <FaUserDoctor size={"1.1rem"} />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <FaUserAlt size={"1.1rem"} />,
  },
];

//Admin Menu
export const AdminMenu = [
  {
    name: "Home",
    path: "/",
    icon: <BiSolidHome size={"1.3rem"} />,
  },
  {
    name: "Doctors",
    path: "/admin/doctors",
    icon: <FaUserDoctor size={"1.1rem"} />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <FaUserAlt size={"1.1rem"} />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <FaUserAlt size={"1.1rem"} />,
  },
];
