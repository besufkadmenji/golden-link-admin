import { useDict } from "@/hooks/useDict";
import { ZatcaInvoiceStatus } from "@/types/zatca-invoice";
import { twMerge } from "tailwind-merge";

const STATUS_CLASSES: Record<ZatcaInvoiceStatus, string> = {
  CLEARED: "bg-[#E7F4EE] text-green-main dark:bg-[#E7F4EE] dark:text-green-main",
  CLEARED_WITH_WARNINGS: "bg-[#FEF6E1] text-[#B7791F] dark:bg-[#FEF6E1] dark:text-[#B7791F]",
  PENDING: "bg-[#F0F1F5] text-[#53545C] dark:bg-[#F0F1F5] dark:text-[#53545C]",
  FAILED: "bg-[#FDF1E8] text-[#E46A11] dark:bg-[#FDF1E8] dark:text-[#E46A11]",
  REJECTED: "bg-[#FDECEC] text-[#D92D20] dark:bg-[#FDECEC] dark:text-[#D92D20]",
};

export const StatusChip = ({ status, className }: { status: ZatcaInvoiceStatus; className?: string }) => {
  const dict = useDict();
  return (
    <p
      className={twMerge(
        "grid h-6 w-max items-center rounded-full px-3 text-xs font-medium",
        STATUS_CLASSES[status],
        className,
      )}
    >
      {dict.eInvoices.statuses[status]}
    </p>
  );
};
