import { For } from "solid-js";
import { FormattedCustomersTable } from "~/lib/definitions";
import Search from "../search";

interface CustomersTableProps {
  customers: FormattedCustomersTable[];
}

export default function CustomersTable(props: CustomersTableProps) {
  return (
    <div class="w-full">
      <h1 class="mb-8 text-xl md:text-2xl dark:text-gray-100">Customers</h1>
      <Search placeholder="Search customers..." />
      <div class="mt-6 flow-root">
        <div class="inline-block min-w-full align-middle">
          <div class="rounded-lg bg-gray-50 dark:bg-gray-800 p-2 md:pt-0">
            {/* Mobile View  */}
            <div class="md:hidden">
              <For each={props.customers}>
                {(customer) => (
                  <div class="mb-2 w-full rounded-md bg-white dark:bg-gray-900 p-4">
                    <div class="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
                      <div>
                        <div class="mb-2 flex items-center">
                          <img
                            src={customer.image_url}
                            class="mr-2 rounded-full"
                            width={28}
                            height={28}
                            alt={`${customer.name}'s profile picture`}
                          />
                          <p>{customer.name}</p>
                        </div>
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                    <div class="flex w-full items-center justify-between border-b border-gray-200 dark:border-gray-700 py-5">
                      <div class="flex w-1/2 flex-col">
                        <p class="text-xs">Pending</p>
                        <p class="font-medium">{customer.total_pending}</p>
                      </div>
                      <div class="flex w-1/2 flex-col">
                        <p class="text-xs">Paid</p>
                        <p class="font-medium">{customer.total_paid}</p>
                      </div>
                    </div>
                    <div class="pt-4 text-sm">
                      <p>{customer.total_invoices} invoices</p>
                    </div>
                  </div>
                )}
              </For>
            </div>

            {/* Desktop View  */}
            <table class="hidden min-w-full text-gray-900 dark:text-gray-100 md:table">
              <thead class="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" class="px-4 py-5 font-medium sm:pl-6">
                    Name
                  </th>
                  <th scope="col" class="px-3 py-5 font-medium">
                    Email
                  </th>
                  <th scope="col" class="px-3 py-5 font-medium">
                    Total Invoices
                  </th>
                  <th scope="col" class="px-3 py-5 font-medium">
                    Total Pending
                  </th>
                  <th scope="col" class="px-4 py-5 font-medium">
                    Total Paid
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-900">
                <For each={props.customers}>
                  {(customer) => (
                    <tr class="w-full border-b border-gray-200 dark:border-gray-700 py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                      <td class="whitespace-nowrap py-5 pl-6 pr-3">
                        <div class="flex items-center gap-3">
                          <img
                            src={customer.image_url}
                            class="rounded-full"
                            width={28}
                            height={28}
                            alt={`${customer.name}'s profile picture`}
                          />
                          <p>{customer.name}</p>
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-3 py-3">
                        {customer.email}
                      </td>
                      <td class="whitespace-nowrap px-3 py-3">
                        {customer.total_invoices}
                      </td>
                      <td class="whitespace-nowrap px-3 py-3">
                        {customer.total_pending}
                      </td>
                      <td class="whitespace-nowrap px-4 py-3">
                        {customer.total_paid}
                      </td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
