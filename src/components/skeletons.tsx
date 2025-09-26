const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/70 before:to-transparent dark:before:via-gray-700/20";
export function CardSkeleton() {
  return (
    <div
      class={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800 p-2 shadow-sm`}
    >
      <div class="flex p-4">
        <div class="h-5 w-5 rounded-md bg-gray-200 dark:bg-gray-700" />
        <div class="ml-2 h-6 w-16 rounded-md bg-gray-200 dark:bg-gray-700 text-sm font-medium" />
      </div>
      <div class="flex items-center justify-center truncate rounded-xl bg-white dark:bg-gray-900 px-4 py-8">
        <div class="h-7 w-20 rounded-md bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

export function RevenueChartSkeleton() {
  return (
    <div class={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div class="mb-4 h-8 w-36 rounded-md bg-gray-100 dark:bg-gray-800" />
      <div class="rounded-xl bg-gray-100 dark:bg-gray-800 p-4">
        <div class="sm:grid-cols-13 mt-0 grid h-[410px] grid-cols-12 items-end gap-2 rounded-md bg-white dark:bg-gray-900 p-4 md:gap-4" />
        <div class="flex items-center pb-2 pt-6">
          <div class="h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div class="ml-2 h-4 w-20 rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}

export function InvoiceSkeleton() {
  return (
    <div class="flex flex-row items-center justify-between border-b border-gray-100 dark:border-gray-700 py-4">
      <div class="flex items-center">
        <div class="mr-2 h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div class="min-w-0">
          <div class="h-5 w-40 rounded-md bg-gray-200 dark:bg-gray-700" />
          <div class="mt-2 h-4 w-12 rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
      <div class="mt-2 h-4 w-12 rounded-md bg-gray-200 dark:bg-gray-700" />
    </div>
  );
}

export function LatestInvoicesSkeleton() {
  return (
    <div
      class={`${shimmer} relative flex w-full flex-col overflow-hidden md:col-span-4`}
    >
      <div class="mb-4 h-8 w-36 rounded-md bg-gray-100 dark:bg-gray-800" />
      <div class="flex grow flex-col justify-between rounded-xl bg-gray-100 dark:bg-gray-800 p-4">
        <div class="bg-white dark:bg-gray-900 px-6">
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
          <InvoiceSkeleton />
        </div>
        <div class="flex items-center pb-2 pt-6">
          <div class="h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div class="ml-2 h-4 w-20 rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}

export default function DashboardSkeleton() {
  return (
    <>
      <div
        class={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800`}
      />
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      <div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChartSkeleton />
        <LatestInvoicesSkeleton />
      </div>
    </>
  );
}

export function TableRowSkeleton() {
  return (
    <tr class="w-full border-b border-gray-100 dark:border-gray-700 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      <td class="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div class="flex items-center gap-3">
          <div class="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800"></div>
          <div class="h-6 w-24 rounded bg-gray-100 dark:bg-gray-800"></div>
        </div>
      </td>
      <td class="whitespace-nowrap px-3 py-3">
        <div class="h-6 w-32 rounded bg-gray-100 dark:bg-gray-800"></div>
      </td>
      <td class="whitespace-nowrap px-3 py-3">
        <div class="h-6 w-16 rounded bg-gray-100 dark:bg-gray-800"></div>
      </td>
      <td class="whitespace-nowrap px-3 py-3">
        <div class="h-6 w-16 rounded bg-gray-100 dark:bg-gray-800"></div>
      </td>
      <td class="whitespace-nowrap px-3 py-3">
        <div class="h-6 w-16 rounded bg-gray-100 dark:bg-gray-800"></div>
      </td>
      <td class="whitespace-nowrap py-3 pl-6 pr-3">
        <div class="flex justify-end gap-3">
          <div class="h-[38px] w-[38px] rounded bg-gray-100 dark:bg-gray-800"></div>
          <div class="h-[38px] w-[38px] rounded bg-gray-100 dark:bg-gray-800"></div>
        </div>
      </td>
    </tr>
  );
}

export function InvoicesMobileSkeleton() {
  return (
    <div class="mb-2 w-full rounded-md bg-white dark:bg-gray-900 p-4">
      <div class="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-8">
        <div class="flex items-center">
          <div class="mr-2 h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-800"></div>
          <div class="h-6 w-16 rounded bg-gray-100 dark:bg-gray-800"></div>
        </div>
        <div class="h-6 w-16 rounded bg-gray-100 dark:bg-gray-800"></div>
      </div>
      <div class="flex w-full items-center justify-between pt-4">
        <div>
          <div class="h-6 w-16 rounded bg-gray-100 dark:bg-gray-800"></div>
          <div class="mt-2 h-6 w-24 rounded bg-gray-100 dark:bg-gray-800"></div>
        </div>
        <div class="flex justify-end gap-2">
          <div class="h-10 w-10 rounded bg-gray-100 dark:bg-gray-800"></div>
          <div class="h-10 w-10 rounded bg-gray-100 dark:bg-gray-800"></div>
        </div>
      </div>
    </div>
  );
}

export function InvoicesTableSkeleton() {
  return (
    <div class="mt-6 flow-root">
      <div class="inline-block min-w-full align-middle">
        <div class="rounded-lg bg-gray-50 dark:bg-gray-800 p-2 md:pt-0">
          <div class="md:hidden">
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
            <InvoicesMobileSkeleton />
          </div>
          <table class="hidden min-w-full text-gray-900 dark:text-gray-100 md:table">
            <thead class="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" class="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" class="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" class="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" class="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" class="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" class="relative pb-4 pl-3 pr-6 pt-2 sm:pr-6">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-900">
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
              <TableRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function InvoiceFormSkeleton() {
  return (
    <form>
      <div
        class={`${shimmer} rounded-md bg-gray-50 dark:bg-gray-800 p-4 md:p-6 ${shimmer}`}
      >
        {/* Simulated form fields */}
        <div class="mb-4 h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700" />
        <div class="mb-4 h-10 w-full rounded-md bg-gray-200 dark:bg-gray-700" />
        <div class="mb-4 h-20 w-full rounded-md bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Simulated buttons */}
      <div class="mt-6 flex justify-end gap-4">
        <div class="h-10 w-20 rounded-md bg-gray-200 dark:bg-gray-700" />
        <div class="h-10 w-32 rounded-md bg-gray-200 dark:bg-gray-700" />
      </div>
    </form>
  );
}

export function PaginationSkeleton() {
  return (
    <div class="flex items-center justify-center gap-2 mt-4 dark opacity-40">
      {/* Previous buttons */}
      <div class="shimmer h-6 w-8 rounded-md bg-gray-200 dark:bg-gray-700" />

      {/* Page numbers */}
      <div class="flex gap-2">
        <div class="shimmer h-8 w-7 rounded-md bg-gray-200 dark:bg-gray-700" />
        <div class="shimmer h-8 w-8 rounded-md bg-gray-300 dark:bg-gray-600" />
        <div class="shimmer h-8 w-7 rounded-md bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Next buttons */}
      <div class="shimmer h-6 w-8 rounded-md bg-gray-200 dark:bg-gray-700" />
    </div>
  );
}
