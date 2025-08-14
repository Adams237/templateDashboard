import { Card } from "./Card";

export const Stat: React.FC<{ label: string; value: string; trend?: string }> = ({ label, value, trend }) => (
  <Card>
    <div className="space-y-1">
      <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
      <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
      {trend && <p className="text-xs text-emerald-600 dark:text-emerald-400">{trend}</p>}
    </div>
  </Card>
);
