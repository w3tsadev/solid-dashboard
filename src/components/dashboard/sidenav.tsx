import { A } from "@solidjs/router";
import AcmeLogo from "../acme-logo";
import NavLinks from "./nav-links";

export default function SideNav() {
  return (
    <div class="flex h-full flex-col px-3 py-4 md:px-2">
      <A
        href="/"
        class="mb-2 flex h-20 items-end justify-start rounded-md bg-emerald-900 p-4 md:h-40"
      >
        <div class="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </A>
      <div class="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div class="hidden h-auto w-full grow rounded-md bg-gray-50 dark:bg-slate-800 md:block"></div>
      </div>
    </div>
  );
}
