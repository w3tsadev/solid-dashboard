import { A, useNavigate, useSubmission } from "@solidjs/router";
import {
  Check,
  ChevronDown,
  CircleDollarSign,
  CircleUser,
  Clock,
} from "lucide-solid";
import { createEffect, For, onCleanup, Show } from "solid-js";
import { CustomerField } from "~/lib/definitions";
import { Button } from "../button";
import { createInvoice } from "~/lib/actions";
import toast from "solid-toast";

interface CreateInvoiceFormProps {
  customers: CustomerField[];
}

export default function CreateInvoiceForm(props: CreateInvoiceFormProps) {
  const submission = useSubmission(createInvoice);
  const navigate = useNavigate();

  createEffect(() => {
    if (submission.error) {
      toast.error(submission.error.message);
    } else if (submission.result?.success) {
      const t = toast.success(
        `${submission.result.message} \nRedirecting in 2 seconds...`,
        { duration: 2100 },
      );

      const timer = setTimeout(() => {
        navigate("/dashboard/invoices");
        toast.dismiss(t);
      }, 2000);

      onCleanup(() => {
        clearTimeout(timer);
        toast.dismiss(t);
      });
    }
  });

  return (
    <form action={createInvoice} method="post">
      <div class="rounded-md bg-gray-50 dark:bg-gray-800 p-4 md:p-6">
        {/*Customer Name*/}
        <div class="mb-4">
          <label
            for="customer"
            class="mb-2 block text-sm font-medium dark:text-gray-100"
          >
            Choose Customer
          </label>
          <div class="relative">
            <select
              id="customer"
              name="customerId"
              class="peer block w-full cursor-pointer appearance-none rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              value=""
              aria-describedby="customer-error"
            >
              <option value={""}>Select a customer</option>
              <For each={props.customers}>
                {(customer) => (
                  <option value={customer.id}>{customer.name}</option>
                )}
              </For>
            </select>
            <CircleUser class="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <ChevronDown class="pointer-events-none absolute right-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          </div>
          <Show when={submission.result?.fieldErrors?.customerId}>
            <div id="customer-error" aria-live="polite" aria-atomic="true">
              <p class="text-red-500 text-sm">
                {submission?.result?.fieldErrors?.customerId}
              </p>
            </div>
          </Show>
        </div>
        {/* Invoice Amount */}
        <div class="mb-4">
          <label
            for="amount"
            class="mb-2 block text-sm font-medium dark:text-gray-100"
          >
            Choose an amount
          </label>
          <div class="relative mt-2 rounded-md">
            <div class="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                min={1}
                placeholder="Enter USD amount"
                class="peer block w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 pl-10 text-sm text-gray-900 dark:text-gray-100 outline-2 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                // required
                aria-describedby="amount-error"
              />
              <CircleDollarSign class="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:text-gray-900 dark:peer-focus:text-gray-100" />
            </div>
            <Show when={submission.result?.fieldErrors?.amount}>
              <div id="amount-error" aria-live="polite" aria-atomic="true">
                <p class="text-red-500 text-sm">
                  {submission?.result?.fieldErrors?.amount}
                </p>
              </div>
            </Show>
          </div>
        </div>
        {/* Invoice Status */}
        <fieldset>
          <legend class="mb-2 block text-sm font-medium dark:text-gray-100">
            Set the invoice status
          </legend>
          <div class="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-[14px] py-3">
            <div class="flex gap-4">
              <div class="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  class="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 focus:ring-2"
                  aria-describedby="status-error"
                />
                <label
                  for="pending"
                  class="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 dark:bg-gray-700 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300"
                >
                  Pending <Clock class="h-4 w-4" />
                </label>
              </div>
              <div class="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  class="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 focus:ring-2"
                  aria-describedby="status-error"
                />
                <label
                  for="paid"
                  class="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 dark:bg-green-700 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Paid <Check class="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <Show when={submission.result?.fieldErrors?.status}>
            <div id="status-error" aria-live="polite" aria-atomic="true">
              <p class="text-red-500 text-sm">
                {submission?.result?.fieldErrors?.status}
              </p>
            </div>
          </Show>
        </fieldset>
      </div>

      <div class="mt-6 flex justify-end gap-4">
        <A
          href="/dashboard/invoices"
          class="flex h-10 items-center rounded-lg bg-gray-100 dark:bg-gray-700 px-4 text-sm font-medium text-gray-600 dark:text-gray-200 transition-colors hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          Cancel
        </A>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}
