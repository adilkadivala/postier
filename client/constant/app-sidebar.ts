import {
  ChartNoAxesColumn,
  ClockArrowUp,
  History,
  MessageSquareShare,
} from "lucide-react";
import { ElementType } from "react";

type menuItems = {
  title: string;
  url: string;
  icon: ElementType;
  breadcrumb: string;
  breadTtitle: string;
};

export const menuItems: menuItems[] = [
  {
    title: "Create-Post",
    url: "/history",
    icon: MessageSquareShare,
    breadcrumb: "Create-Post",
    breadTtitle: "Play-Ground for creating a post",
  },
  {
    title: "Scheduled",
    url: "/schedule",
    icon: ClockArrowUp,
    breadcrumb: "Scheduled",
    breadTtitle: "Scheduled post",
  },
  {
    title: "Analytics",
    url: "/history",
    icon: ChartNoAxesColumn,
    breadcrumb: "Analytics",
    breadTtitle: "Your Analytics of postes ",
  },
  {
    title: "History",
    url: "/history",
    icon: History,
    breadcrumb: "History",
    breadTtitle: "Your scheduled postes ",
  },
];
