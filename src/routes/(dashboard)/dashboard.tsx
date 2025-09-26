import { RouteSectionProps } from "@solidjs/router";
import { ErrorBoundary } from "solid-js";
import SideNav from "~/components/dashboard/sidenav";

export default function DashboardLayout(props: RouteSectionProps) {
  return (
    <div class="flex flex-col h-screen md:flex-row md:overflow-hidden">
      <div class="w-full flex-none md:w-64">
        <SideNav />
      </div>

      <ErrorBoundary
        fallback={(error, reset) => (
          <div class="flex h-full flex-col items-center justify-center w-full">
            <h2 class="text-center">Something went wrong!: {error.message}</h2>
            <button
              class="mt-4 rounded-md bg-emerald-700 px-4 py-2 text-sm text-white transition-colors hover:bg-emerald-800"
              onClick={reset}
            >
              Try again
            </button>
          </div>
        )}
      >
        <div class="flex-grow p-6 md:overflow-y-auto md:p-12">
          {props.children}
        </div>
      </ErrorBoundary>
    </div>
  );
}
