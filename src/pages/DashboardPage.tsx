import { Card } from "../components/ui/Card";
import { Collapsible } from "../components/ui/Collapsible";
import { Stat } from "../components/ui/Stat";
import { Table } from "../components/ui/Table";

const EXAMPLE_ROWS = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  name: `Item #${i + 1}`,
  status: i % 2 === 0 ? "Active" : "Pending",
  date: new Date(Date.now() - i * 86_400_000).toISOString().split("T")[0],
}));

export const DashboardPage: React.FC = () => {
  return (
    <>
      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Revenue" value="$24,500" trend="↑ 8.2% vs last week" />
        <Stat label="Users" value="1,284" trend="↑ 2.1%" />
        <Stat label="Conversion" value="3.4%" trend="↗︎ 0.3%" />
        <Stat label="Tickets" value="27" trend="↓ 5 today" />
      </div>

      {/* Content grid */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card title="Recent Activity">
            <ul className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-blue-600" />
                  <div className="text-sm">
                    <p className="font-medium">Event #{i + 1}</p>
                    <p className="text-slate-600 dark:text-slate-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Collapsible title="Team Notes">
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Keep your team aligned with short, actionable notes. This panel is fully responsive and animated.
            </p>
          </Collapsible>
        </div>

        <Table rows={EXAMPLE_ROWS} onClickRow={(id) => console.log("Row:", id)} />
      </div>
    </>
  );
};