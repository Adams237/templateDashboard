import { cn } from "../../Hooks/hooks";

export const Card: React.FC<React.PropsWithChildren<{ className?: string; title?: string; extra?: React.ReactNode }>> = ({
  className,
  title,
  extra,
  children,
}) => (
  <div className={cn("rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900", className)}>
    {title && (
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">{title}</h3>
        {extra}
      </div>
    )}
    {children}
  </div>
);