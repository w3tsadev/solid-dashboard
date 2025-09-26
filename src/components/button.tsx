import { JSX, splitProps } from "solid-js";

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  const [local, rest] = splitProps(props, ["children", "class"]);
  return (
    <button
      {...rest}
      class={`flex h-10 items-center rounded-lg bg-emerald-900 hover:bg-emerald-700 px-4 text-sm font-medium text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 ${local.class}`}
    >
      {local.children}
    </button>
  );
}
