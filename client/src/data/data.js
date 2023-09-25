import { BiSolidHome } from "react-icons/bi";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { FaUserDoctor } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";

export const SidebarMenu = [
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
  {
    name: "Logout",
    path: "/logout",
    icon: <LuLogOut size={"1.1rem"} />,
  },
];
