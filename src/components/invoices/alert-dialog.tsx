import { Trash2 } from "lucide-solid";
import { createSignal, Show, useTransition } from "solid-js";
import { deleteInvoice } from "~/lib/actions";
import { formatCurrency } from "~/lib/utils";

interface AlertDialogProps {
  id: string;
  amount: number;
  name: string;
}
const [isOpen, setIsOpen] = createSignal(false);

export default function AlertDialog(props: AlertDialogProps) {
  const [pending, start] = useTransition();

  const toggleDialog = (open: boolean) => {
    start(() => setIsOpen(open));
  };

  const openDialog = () => toggleDialog(true);
  const closeDialog = () => toggleDialog(false);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") closeDialog();
  };

  return (
    <>
      {/*Trigger Button*/}
      <button
        type="button"
        class="rounded-md border p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
        aria-label="Initiate the delete process for this invoice."
        onClick={openDialog}
      >
        <Trash2 class="w-5" />
      </button>

      {/*Dialog Backdrop*/}
      <Show when={isOpen()}>
        <div
          class="fixed inset-0 bg-black/50 backdrop-blur-2xl transition-all z-40 duration-200"
          classList={{
            "opacity-0": pending(),
            "opacity-100": !pending(),
          }}
          aria-hidden="true"
          onClick={closeDialog}
        />
        {/* Dialog*/}
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-title"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          onKeyDown={handleKeyDown}
        >
          <div
            class="bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-lg w-full p-6 transition-all duration-200"
            classList={{
              "opacity-0 translate-y-4": pending(),
              "opacity-100 translate-y-0": !pending(),
            }}
            tabIndex={"0"}
          >
            <h2 id="dialog-title" class="text-lg font-semibold mb-2">
              Confirm Deletion
            </h2>
            <p
              id="dialog-description"
              class="text-gray-600 mb-4 dark:text-gray-300 break-normal"
            >
              Are you sure you want to delete invoice from {props.name} for{" "}
              {formatCurrency(props.amount)} ?
              <br />
              This action cannot be undone.
            </p>
            <div class="flex justify-end space-x-3">
              <button
                type="button"
                onClick={closeDialog}
                class="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
                disabled={pending()}
              >
                Keep Item
              </button>
              <form action={deleteInvoice.with(props.id)} method="post">
                <button
                  type="submit"
                  class="rounded-md border p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                  disabled={pending()}
                >
                  <span class="sr-only">Delete</span>
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      </Show>
    </>
  );
}
