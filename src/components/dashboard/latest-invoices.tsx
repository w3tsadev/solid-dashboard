import { Divide, RefreshCcw } from "lucide-solid";
import { For } from "solid-js";
import { LatestInvoice } from "~/lib/definitions";

interface LatestInvoicesProps {
  latestInvoices: LatestInvoice[];
}

export default function LatestInvoices(props: LatestInvoicesProps) {
  if (!props.latestInvoices || props.latestInvoices.length === 0) {
    return <p class="mt-4 text-gray-400">No data available.</p>;
  }
  return (
    <div class="flex flex-col w-full md:col-span-4">
      <h2 class="mb-4 text-xl md:text-2xl">Latest Invoices</h2>
      <div class="flex flex-col grow justify-between rounded-xl bg-gray-50 dark:bg-gray-800/75 p-4">
        <div class="bg-white dark:bg-slate-900 px-6">
          <For each={props.latestInvoices}>
            {(invoice, i) => (
              <div
                class="flex flex-row items-center justify-between py-4"
                classList={{ "border-t": i() !== 0 }}
              >
                <div class="flex items-center">
                  <img
                    src={invoice.image_url}
                    alt={`${invoice.name}'s profile picture`}
                    class="mr-4 rounded-full"
                    width={32}
                    height={32}
                  />
                  <div class="min-w-0">
                    <p class="truncate text-sm font-semibold md:text-base">
                      {invoice.name}
                    </p>
                    <p class="hidden text-sm text-gray-500 sm:block">
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p class="truncate text-sm font-medium md:text-base">
                  {invoice.amount}
                </p>
              </div>
            )}
          </For>
        </div>
        <div class="flex items-center pb-2 pt-6">
          <RefreshCcw class="h-5 w-5 text-gray-500" />
          <h3 class="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
