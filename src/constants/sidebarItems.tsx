import {
  DashboardOutlined,
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
    link: routes.users,
    title: "Members",
    icon: <UserOutlined style={{ fontSize: 14 }} />,
  },
  {
    link: routes.class,
    title: "Class",
    icon: <UserOutlined style={{ fontSize: 14 }} />,
  },
  {
    link: routes.payment,
    title: "Payment",
    icon: <UserOutlined style={{ fontSize: 14 }} />,
  }

];
