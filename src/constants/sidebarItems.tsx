import {
  BankOutlined,
  ContactsOutlined,
  DashboardOutlined,
  TeamOutlined,
  UnlockOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { routes } from "@/constants/routesleanq_support_coordinator";

export interface SidebarItem {
  link: string;
  title: string;
  icon: JSX.Element;
  children?: SidebarItem[];
}

export const sidebarItems: SidebarItem[] = [
  {
    link: routes.dashboard,
    title: "Dashboard",
    icon: <DashboardOutlined style={{ fontSize: 14 }} />,
  },
  {
    link: routes.participants,
    title: "Participants",
    icon: <TeamOutlined style={{ fontSize: 14 }} />,
  },
  {
    link: routes.users,
    title: "User",
    icon: <UserOutlined style={{ fontSize: 14 }} />,
  },
  {
    link: routes.projects,
    title: "Projects",
    icon: <UnorderedListOutlined style={{ fontSize: 14 }} />,
  },
  {
    link: routes.roles,
    title: "Role and Permission",
    icon: <UnlockOutlined style={{ fontSize: 14 }} />,
  },
  {
    link: "#",
    title: "Contact",
    icon: <ContactsOutlined style={{ fontSize: 14 }} />,
    children: [
      {
        link: "/contact/individual",
        title: "Individual",
        icon: <UserOutlined style={{ fontSize: 14 }} />,
      },
      {
        link: "/contact/organizational",
        title: "Organizational",
        icon: <BankOutlined style={{ fontSize: 14 }} />,
      },
    ],
  },
];
