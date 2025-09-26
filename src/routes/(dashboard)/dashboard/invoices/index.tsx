import { createAsync, useLocation } from "@solidjs/router";
import { CreateInvoice } from "~/components/invoices/buttons";
import Search from "~/components/search";
import Table from "~/components/invoices/table";
import Pagination from "~/components/invoices/pagination";
import { fetchInvoicesPages } from "~/lib/data";
import { Suspense } from "solid-js";
import { PaginationSkeleton } from "~/components/skeletons";

export default function InvoicesPage() {
  const location = useLocation();
  const searchTerm = () => location.query.searchTerm || "";
  const currentPage = () => Number(location.query.page) || 1;

  const totalPages = createAsync(() =>
    fetchInvoicesPages(searchTerm() as string),
  );
  return (
    <div class="w-full">
      <div class="flex w-full items-center justify-between">
        <h1 class={"text-2xl"}>Invoices</h1>
      </div>
      <div class="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Table query={searchTerm() as string} currentPage={currentPage()} />
      <Suspense fallback={<PaginationSkeleton />}>
        <Pagination totalPages={totalPages()!} currentPage={currentPage()} />
      </Suspense>
    </div>
  );
}
