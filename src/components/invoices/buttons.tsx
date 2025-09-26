import { A } from "@solidjs/router";
import { Pencil, Plus, Trash2 } from "lucide-solid";
import { deleteInvoice } from "~/lib/actions";

export function CreateInvoice() {
  return (
    <A
      href="/dashboard/invoices/create"
      class="flex h-10 items-center rounded-lg hover:bg-slate-800 bg-emerald-900 px-4 text-sm font-medium text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span class="hidden md:block">Create Invoice</span>{" "}
      <Plus class="h-5 md:ml-4" />
    </A>
  );
}

interface UpdateInvoiceProps {
  id: string;
}

export function UpdateInvoice(props: UpdateInvoiceProps) {
  return (
    <A
      href={`/dashboard/invoices/${props.id}`}
      class="rounded-md border p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
      aria-label="Update this invoice."
    >
      <Pencil class="w-5" />
    </A>
  );
}

interface DeleteInvoiceProps {
  id: string;
}

export function DeleteInvoice(props: DeleteInvoiceProps) {
  return (
    <form action={deleteInvoice.with(props.id)} method="post">
      <button
        type="submit"
        class="rounded-md border p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <span class="sr-only">Delete</span>
        <Trash2 class="w-5" />
      </button>
    </form>
  );

  return "";
}
