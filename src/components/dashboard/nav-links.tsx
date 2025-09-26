import { A } from "@solidjs/router";
import { Files, Home, Users } from "lucide-solid";
import { For } from "solid-js";

const links = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Invoices", href: "/dashboard/invoices", icon: Files },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
];

export default function NavLinks() {
  return (
    <>
      <For each={links}>
        {(link) => {
          const LinkIcon = link.icon;

          return (
            <A
              href={link.href}
              class="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 dark:bg-slate-800 p-3 text-sm font-medium hover:bg-emerald-900/50 md:flex-none md:justify-start md:p-2 md:px-3"
              activeClass="border"
              end
            >
              <LinkIcon class="w-6" />
              <p class="hidden md:block">{link.name}</p>
            </A>
          );
        }}
      </For>
    </>
  );
}
