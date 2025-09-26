import { Calendar } from "lucide-solid";
import { For } from "solid-js";
import { Revenue } from "~/lib/definitions";
import { generateYAxis } from "~/lib/utils";

interface RevenueChartProps {
  revenue: Revenue[];
}

export default function RevenueChart(props: RevenueChartProps) {
  const chartHeight = 350;

  const { yAxisLables, topLabel } = generateYAxis(props.revenue);

  if (!props.revenue || props.revenue.length === 0) {
    return <p class="mt-4 text-gray-400">No data available.</p>;
  }
  return (
    <div class="w-full md:col-span-4">
      <h2 class="mb-4 text-xl md:text-2xl">Recent Revenue</h2>

      <div class="rounded-xl bg-gray-50 dark:bg-gray-800/75 p-4">
        <div class="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white dark:bg-slate-900 p-4 md:gap-4">
          <div
            class="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}
          >
            <For each={yAxisLables}>{(label) => <p>{label}</p>}</For>
          </div>

          <For each={props.revenue}>
            {(month) => (
              <div class="flex flex-col items-center gap-2">
                <div
                  class="w-full rounded-md bg-emerald-700"
                  style={{
                    height: `${(chartHeight / topLabel) * month.revenue}px`,
                  }}
                ></div>
                <p class="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                  {month.month}
                </p>
              </div>
            )}
          </For>
        </div>
        <div class="flex items-center pb-2 pt-6">
          <Calendar class="h-5 w-5 text-gray-500" />
          <h3 class="ml-2 text-sm text-gray-500">Last 12 months</h3>
        </div>
      </div>
    </div>
  );
}
