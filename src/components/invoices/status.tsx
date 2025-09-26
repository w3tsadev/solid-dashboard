import { Check, Clock } from "lucide-solid";
import { Show } from "solid-js";

interface InvoiceStatusProps {
  status: string;
}

export default function InvoiceStatus(props: InvoiceStatusProps) {
  return (
    <span
      class="inline-flex items-center rounded-full px-2 py-1 text-xs"
      classList={{
        "bg-gray-100 dark:bg-gray-800 text-gray-500":
          props.status === "pending",
        "bg-green-500 dark:bg-green-700 text-white": props.status === "paid",
      }}
    >
      <Show when={props.status === "pending"}>
        <>
          Pending
          <Clock class="ml-1 w-4 text-gray-500" />
        </>
      </Show>
      <Show when={props.status === "paid"}>
        <>
          Paid
          <Check class="ml-1 w-4 text-white" />
        </>
      </Show>
    </span>
  );
}
