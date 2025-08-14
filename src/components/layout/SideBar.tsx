import { LayoutDashboard, X } from "lucide-react";
import { cn } from "../../Hooks/hooks";
import type { NavItem } from "./Item";
import { motion } from "framer-motion";

export const Sidebar: React.FC<{
  items: NavItem[];
  active: string;
  onSelect: (label: string) => void;
  variant?: "desktop" | "mobile";
  onCloseMobile?: () => void;
}> = ({ items, active, onSelect, variant = "desktop", onCloseMobile }) => {

    
  const content = (
    <nav className=" fixed space-y-1">
      {items.map((item) => (
        <SidebarLink
          key={item.label}
          label={item.label}
          icon={item.icon}
          active={active === item.label}
          onClick={() => {
            onSelect(item.label);
            onCloseMobile?.();
          }}
        />
      ))}
    </nav>
  );

  if (variant === "mobile") return (
    <motion.aside
      initial={{ x: -320 }}
      animate={{ x: 0 }}
      exit={{ x: -320 }}
      transition={{ type: "spring", stiffness: 280, damping: 28 }}
      className="relative h-full w-72 max-w-[85%] border-r border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-blue-600 text-white shadow">
            <LayoutDashboard className="h-4 w-4" />
          </div>
          <span className="font-semibold">Acme</span>
        </div>
        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
          onClick={onCloseMobile}
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      {content}
    </motion.aside>
  );

  return (
    <aside className="hidden border-r border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 md:block">
      {content}
    </aside>
  );
};

const SidebarLink: React.FC<{
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active?: boolean;
  onClick?: () => void;
}> = ({ label, icon: Icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
      active
        ? "bg-blue-600 text-white shadow"
        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
    )}
  >
    <Icon className="h-4 w-4" />
    <span className="truncate">{label}</span>
  </button>
);