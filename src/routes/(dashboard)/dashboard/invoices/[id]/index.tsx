import { createAsync, useParams } from "@solidjs/router";
import { Show } from "solid-js";
import { Suspense } from "solid-js";
import Breadcrumbs from "~/components/invoices/breadcrumbs";
import EditInvoiceForm from "~/components/invoices/edit-form";
import { fetchCustomers, fetchInvoiceById } from "~/lib/data";

export default function editInvoicePage() {
  const params = useParams();
  const customers = createAsync(() => fetchCustomers());
  const invoice = createAsync(() => fetchInvoiceById(params.id));
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Update Invoice",
            href: `/dashboard/invoices/${params.id}/edit`,
            active: true,
          },
        ]}
      />
      <Suspense fallback={"loading.."}>
        <Show when={invoice() && customers()}>
          <EditInvoiceForm invoice={invoice()!} customers={customers()!} />
        </Show>
      </Suspense>
    </>
  );
}
