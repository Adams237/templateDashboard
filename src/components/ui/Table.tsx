import { cn } from "../../Hooks/hooks";
import { Card } from "./Card";

export const Table: React.FC<{ rows: Array<{ id: number; name: string; status: string; date: string }>; onClickRow?: (id: number) => void; }>
= ({ rows, onClickRow }) => (
  <Card title="Items" extra={<button className="text-xs text-blue-600 hover:underline">View all</button>}>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-800">
            <th className="py-2 pr-4">Name</th>
            <th className="py-2 pr-4">Status</th>
            <th className="py-2 pr-4">Date</th>
            <th className="py-2 pr-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-slate-100 last:border-0 dark:border-slate-800">
              <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-100">{row.name}</td>
              <td className="py-2 pr-4">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2 py-0.5 text-xs",
                    row.status === "Active"
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
                      : "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200"
                  )}
                >
                  {row.status}
                </span>
              </td>
              <td className="py-2 pr-4 text-slate-600 dark:text-slate-300">{row.date}</td>
              <td className="py-2 pr-4 text-right">
                <button
                  onClick={() => onClickRow?.(row.id)}
                  className="rounded-lg px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950"
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);