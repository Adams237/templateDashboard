import { BarChart3, LayoutDashboard, Settings, Users } from "lucide-react";

export type NavItem = { label: string; icon: React.ComponentType<{ className?: string }>; };

export const NAV_ITEMS: NavItem[] = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Analytics", icon: BarChart3 },
  { label: "Users", icon: Users },
  { label: "Settings", icon: Settings },
];