import { createAsync } from "@solidjs/router";
import { Show, Suspense } from "solid-js";
import Card from "~/components/dashboard/card";

import LatestInvoices from "~/components/dashboard/latest-invoices";
import RevenueChart from "~/components/dashboard/revenue-chart";
import {
  CardsSkeleton,
  LatestInvoicesSkeleton,
  RevenueChartSkeleton,
} from "~/components/skeletons";
import { fetchCardData, fetchLatestInvoices, fetchRevenue } from "~/lib/data";

export const route = {
  preload: () => (fetchCardData(), fetchLatestInvoices(), fetchRevenue()),
};

export default function DashboardPage() {
  const cardData = createAsync(() => fetchCardData());
  const revenue = createAsync(() => fetchRevenue());
  const latestInvoices = createAsync(() => fetchLatestInvoices());
  return (
    <div>
      <h1 class="mb-4 text-xl md:text-2xl">Dashboard</h1>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <Card
            title="Collected"
            value={cardData()!?.totalPaidInvoices}
            type="collected"
          />
          <Card
            title="Pending"
            value={cardData()!?.totalPendingInvoices}
            type="pending"
          />
          <Card
            title="Total Invoices"
            value={cardData()!?.numberOfInvoices}
            type="invoices"
          />
          <Card
            title="Total Customers"
            value={cardData()!?.numberOfCustomers}
            type="customers"
          />
        </Suspense>
      </div>

      <div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <Show when={revenue()}>
            <RevenueChart revenue={revenue()!} />
          </Show>
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <Show when={latestInvoices()}>
            <LatestInvoices latestInvoices={latestInvoices()!} />
          </Show>
        </Suspense>
      </div>
    </div>
  );
}
