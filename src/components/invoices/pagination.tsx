import { For, Show, createMemo } from "solid-js";
import { useSearchParams } from "@solidjs/router";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-solid";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export default function Pagination(props: PaginationProps) {
  const [, setSearchParams] = useSearchParams();
  const maxVisible = 7;

  const goToPage = (page: number) => {
    setSearchParams({ page: String(page) });
  };

  // Use createMemo to recalculate visible pages whenever currentPage changes
  const visiblePages = createMemo(() => {
    if (props.totalPages <= maxVisible) {
      // If total pages is less than or equal to 7, show all pages
      return Array.from({ length: props.totalPages }, (_, i) => i + 1);
    }

    // Calculate start and end of the 7-page window
    const half = Math.floor(maxVisible / 2);
    let start = props.currentPage - half;
    let end = props.currentPage + half;

    // Adjust if window goes beyond first page
    if (start < 1) {
      start = 1;
      end = maxVisible;
    }

    // Adjust if window goes beyond last page
    if (end > props.totalPages) {
      end = props.totalPages;
      start = props.totalPages - maxVisible + 1;
    }

    // Create array of visible pages
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  });

  return (
    <nav class="flex items-center justify-center gap-2 mt-4">
      {/* Mobile view - current page with navigation arrows */}
      <div class="md:hidden flex items-center gap-2">
        <Show when={props.currentPage > 1}>
          <button
            class="bg-transparent px-3 py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 rounded"
            onClick={() => goToPage(1)}
            aria-label="Go to First Page."
          >
            <ChevronFirst class="w-5 h-5" />
          </button>
          <button
            class="bg-transparent px-3 py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 rounded"
            onClick={() => goToPage(props.currentPage - 1)}
            aria-label="Go to Previous Page."
          >
            <ChevronLeft class="w-5 h-5" />
          </button>
        </Show>

        <div class="flex items-center gap-1">
          <span class="px-3 py-1 text-gray-700 font-medium">
            {props.currentPage}
          </span>
          <span class="text-gray-500">of</span>
          <span class="px-3 py-1 text-gray-700">{props.totalPages}</span>
        </div>

        <Show when={props.currentPage < props.totalPages}>
          <button
            class="bg-transparent cursor-pointer px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-900 rounded"
            onClick={() => goToPage(props.currentPage + 1)}
            aria-label="Go to Next Page."
          >
            <ChevronRight class="w-5 h-5" />
          </button>
          <button
            class="bg-transparent cursor-pointer px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-900 rounded"
            onClick={() => goToPage(props.totalPages)}
            aria-label="Go to Last Page."
          >
            <ChevronLast class="w-5 h-5" />
          </button>
        </Show>
      </div>

      {/* Desktop view - full pagination */}
      <div class="hidden md:flex items-center gap-2">
        <Show when={props.currentPage > 1}>
          <button
            class="bg-transparent px-3 py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 rounded"
            onClick={() => goToPage(1)}
            aria-label="Go to First Page."
          >
            <ChevronFirst class="w-5 h-5" />
          </button>
          <button
            class="bg-transparent px-3 py-1 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 rounded"
            onClick={() => goToPage(props.currentPage - 1)}
            aria-label="Go to Previous Page."
          >
            <ChevronLeft class="w-5 h-5" />
          </button>
        </Show>

        <Show when={props.totalPages > 1}>
          <For each={visiblePages()}>
            {(page) => (
              <button
                class="px-3 py-1 rounded"
                classList={{
                  border: props.currentPage === page,
                  "bg-transparent cursor-pointer": props.currentPage !== page,
                }}
                onClick={() => goToPage(page)}
                aria-label={"page " + page.toString()}
              >
                {page}
              </button>
            )}
          </For>
        </Show>

        <Show when={props.currentPage < props.totalPages}>
          <button
            class="bg-transparent cursor-pointer px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-900 rounded"
            onClick={() => goToPage(props.currentPage + 1)}
            aria-label="Go to Next Page."
          >
            <ChevronRight class="w-5 h-5" />
          </button>
          <button
            class="bg-transparent cursor-pointer px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-900 rounded"
            onClick={() => goToPage(props.totalPages)}
            aria-label="Go to Last Page."
          >
            <ChevronLast class="w-5 h-5" />
          </button>
        </Show>
      </div>
    </nav>
  );
}
