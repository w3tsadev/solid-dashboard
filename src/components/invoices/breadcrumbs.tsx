import { A } from "@solidjs/router";
import { For, Show } from "solid-js";

interface BreadcrumbsProps {
  breadcrumbs: {
    label: string;
    href: string;
    active?: boolean;
  }[];
}

export default function Breadcrumbs(props: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" class="mb-6 block">
      <ol class="flex text-xl md:text-2xl">
        <For each={props.breadcrumbs}>
          {(breadcrumb, i) => (
            <li
              aria-current={breadcrumb.active}
              classList={{
                "text-gray-900 dark:text-gray-700": breadcrumb.active,
                "text-gray-500 dark:text-gray-400": !breadcrumb.active,
              }}
            >
              <A href={breadcrumb.href}>{breadcrumb.label}</A>
              <Show when={i() < props.breadcrumbs.length - 1}>
                <span class="mx-3 inline-block">/</span>
              </Show>
            </li>
          )}
        </For>
      </ol>
    </nav>
  );
}
