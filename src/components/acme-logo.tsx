import { Globe } from "lucide-solid";

export default function AcmeLogo() {
  return (
    <div class={`flex flex-row items-center leading-none text-white`}>
      <Globe class="h-12 w-12 rotate-[15deg]" />
      <p class="text-[44px]">Acme</p>
    </div>
  );
}
