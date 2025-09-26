import { createAsync } from "@solidjs/router";
import Breadcrumbs from "~/components/invoices/breadcrumbs";
import CreateInvoiceForm from "~/components/invoices/create-form";
import { fetchCustomers } from "~/lib/data";

export default function CreatePage() {
  const customers = createAsync(() => fetchCustomers());
  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Invoices", href: "/dashboard/invoices" },
          {
            label: "Create Invoice",
            href: "/dashboard/invoices/create",
            active: true,
          },
        ]}
      />
      <CreateInvoiceForm customers={customers()!} />
    </>
  );
}
