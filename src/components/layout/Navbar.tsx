import { Bell, LayoutDashboard, Menu, Moon, Search, Sun } from "lucide-react";
import type { UserInterface } from "../../utils/redux/slice/user.interface";
import { useState } from "react";
import Notification from "./Notification";
import MenuProfile from "./Menu";

export const Navbar: React.FC<{
  onOpenSidebar: () => void;
  isDark: boolean;
  toggleDark: () => void;
  user: UserInterface
}> = ({ onOpenSidebar, isDark, toggleDark, user }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/70 bg-white/90 backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/80">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3">
        {/* Mobile menu button */}
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-slate-100 focus:outline-none dark:hover:bg-slate-800 md:hidden"
          onClick={onOpenSidebar}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-blue-600 text-white shadow">
            <LayoutDashboard className="h-4 w-4" />
          </div>
          <span className="font-semibold">Dashboard</span>
        </div>

        {/* Search */}
        <div className="ml-auto hidden w-full max-w-md items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-2 md:ml-2">
          <button onClick={() => setShowNotifications(!showNotifications)} className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <Bell className="h-5 w-5" />
          </button>
          <button
            onClick={toggleDark}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <div className="hidden items-center gap-2 md:flex">
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
            <div onClick={()=>setShowUserMenu(!showUserMenu)} className="flex cursor-pointer items-center gap-2 rounded-xl bg-slate-100 px-2 py-1 dark:bg-slate-800">
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
              <span className="text-sm">{user.name}</span>
            </div>
          </div>
        </div>
      </div>
      <Notification showNotifications={showNotifications} setShowNotifications={setShowNotifications} alerts={[]} />
      <MenuProfile showUserMenu={showUserMenu} />
    </header>
  )
};