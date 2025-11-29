import { CancelButton } from "@/components/app/shared/button/CancelButton";
import { DownloadButton } from "@/components/app/shared/button/DownloadButton";
import { PrintButton } from "@/components/app/shared/button/PrintButton";
import { useDict } from "@/hooks/useDict";
import { useRouter } from "next/navigation";

export const InvoiceHeader = ({
  title,
  actions,
}: {
  title: string;
  actions: {
    onDownload: () => void;
    onPrint: () => void;
  };
}) => {
  const dict = useDict();
  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <h1
        className={
          "text-secondary dark:text-dark-white flex items-center gap-2 text-2xl leading-6 font-bold tracking-tight"
        }
      >
        {title}
      </h1>
      <div className="flex items-center gap-4">
        <DownloadButton onPress={actions.onDownload} />
        <PrintButton
          label={dict.common.actions.print}
          onPress={actions.onPrint}
        />
        <CancelButton
          onPress={() => router.push("/inventory-operations/outbound")}
        />
      </div>
    </div>
  );
};
