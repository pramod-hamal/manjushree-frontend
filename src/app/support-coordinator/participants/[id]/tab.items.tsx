import {
    BarChartOutlined,
    ContactsOutlined,
    FolderOutlined,
    HeartOutlined,
    UserOutlined,
} from "@ant-design/icons";

import HealthList from "./components/health/HealthList";
import DocumentsList from "./components/documents/DocumentsList";
import ContactList from "./components/contact/ContactList";
import Plan from "./components/plan/Plan";
import Profile from "./components/profile/Profile";


export const items: any[] = [
    {
        label: "Profile",
        key: "1",
        children: <Profile />,
        icon: <UserOutlined />,
    },
    {
        label: "Care Plan",
        key: "2",
        children: <HealthList />,
        icon: <HeartOutlined />,
    },
    {
        label: "Documents",
        key: "3",
        children: <DocumentsList />,
        icon: <FolderOutlined />,
    },
    {
        label: "Contact",
        key: "4",
        children: <ContactList />,
        icon: <ContactsOutlined />,
    },
    { label: "Budget", key: "5", children: <Plan />, icon: <BarChartOutlined /> },
];