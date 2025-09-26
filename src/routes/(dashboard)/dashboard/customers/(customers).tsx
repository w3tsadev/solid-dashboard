import { createAsync, useLocation } from "@solidjs/router";
import { Suspense } from "solid-js";
import CustomersTable from "~/components/customers/table";
import { InvoiceFormSkeleton } from "~/components/skeletons";
import { fetchFilteredCustomers } from "~/lib/data";

export default function CustomersPage() {
  const location = useLocation();
  const searchTerm = () => location.query.searchTerm || "";
  const customers = createAsync(() =>
    fetchFilteredCustomers(searchTerm() as string),
  );
  return (
    <div>
      <Suspense fallback={<InvoiceFormSkeleton />}>
        <CustomersTable customers={customers()!} />
      </Suspense>
    </div>
  );
}
