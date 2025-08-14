import { useEffect, useMemo, useState } from "react";
// import { useDarkMode } from "../../Hooks/hooks";
import { Navbar } from "./Navbar";
import { NAV_ITEMS } from "./Item";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./SideBar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function useDarkMode() {
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined" ? document.documentElement.classList.contains("dark") : false
  );

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [isDark]);

  return { isDark, setIsDark } as const;
}

export const Layout: React.FC<React.PropsWithChildren> = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const currentUser = useSelector((state:any)=>state.user.value[0])
  const { isDark, setIsDark } = useDarkMode();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("Overview");

  console.log(currentUser)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const PageTitle = useMemo(() => active, [active]);

  return (
    <div className="min-h-screen  bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Navbar onOpenSidebar={() => setMobileOpen(true)} isDark={isDark} user={currentUser} toggleDark={() => setIsDark(!isDark)} />

      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-[240px_1fr]">
        {/* Desktop sidebar */}
        <Sidebar items={NAV_ITEMS} active={active} onSelect={setActive} />

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div className="fixed inset-0 z-50 md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
              <Sidebar
                items={NAV_ITEMS}
                active={active}
                onSelect={setActive}
                variant="mobile"
                onCloseMobile={() => setMobileOpen(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content */}
        <main className=" flex-1 px-4 py-6 md:px-6">
          {/* Breadcrumb / Title */}
          <div className="mb-6">
            <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Dashboard</p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">{PageTitle}</h1>
          </div>
          <Outlet/>
          {/* Footer */}
          <div className="mt-10 text-center text-xs text-slate-500 dark:text-slate-400">Built with React • Tailwind • Framer Motion • Lucide</div>
        </main>

      </div>
    </div>
  );
};
