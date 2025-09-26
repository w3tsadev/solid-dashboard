import { Banknote, Clock, Users, Inbox } from "lucide-solid";

const iconMap = {
  collected: Banknote,
  customers: Users,
  pending: Clock,
  invoices: Inbox,
};

interface CardProps {
  title: string;
  value: number | string;
  type: "invoices" | "customers" | "pending" | "collected";
}

export default function Card(props: CardProps) {
  const Icon = iconMap[props.type];
  return (
    <div class="rounded-xl bg-gray-50 dark:bg-gray-900/75 p-2 shadow-sm">
      <div class="flex p-4">
        {Icon ? <Icon class="h-5 w-5 text-gray-700" /> : null}
        <h3 class="ml-2 text-sm font-medium">{props.title}</h3>
      </div>
      <p class="truncate rounded-xl bg-white dark:bg-slate-900 px-4 py-8 text-center text-2xl">
        {props.value}
      </p>
    </div>
  );
}
