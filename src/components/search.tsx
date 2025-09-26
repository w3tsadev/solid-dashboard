import { debounce } from "@solid-primitives/scheduled";
import { useSearchParams } from "@solidjs/router";
import { Search as SearchIcon, X } from "lucide-solid";
import { useTransition } from "solid-js";

interface SearchProps {
  placeholder: string;
}

export default function Search(props: SearchProps) {
  const [isSearching] = useTransition();
  const [search, setParams] = useSearchParams();
  return (
    <form
      class="relative flex flex-1 flex-shrink-0"
      role="search"
      onSubmit={(e) => e.preventDefault()}
    >
      <label for="search" class="sr-only">
        Search
      </label>
      <input
        type="text"
        id="search"
        class="block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={props.placeholder}
        value={search.searchTerm || ""}
        onInput={debounce((e) => {
          setParams({ searchTerm: e.target.value, page: 1 });
        }, 300)}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setParams({ searchTerm: "", page: 1 });
            (e.target as HTMLInputElement).blur();
          }
        }}
      />
      <div class="absolute right-3 top-2">
        <div
          class="inline-block w-5 h-5 border-[3px] border-[#4fc76680] border-t-white rounded-full opacity-0 transition-opacity duration-100 ease-linear animate-spin"
          classList={{
            "opacity-100": isSearching(),
          }}
          role="progressbar"
          aria-busy={isSearching() ? "true" : "false"}
        />
      </div>
      <X
        class="absolute right-3 top-2 text-gray-400 hover:text-gray-600 transition-opacity duration-200 opacity-0 cursor-pointer"
        classList={{
          "opacity-100": search.searchTerm!?.length > 0,
        }}
        onClick={() => setParams({ searchTerm: "" })}
      />
      <SearchIcon class="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </form>
  );
}
