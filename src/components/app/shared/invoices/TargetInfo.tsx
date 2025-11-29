import { InfoItem } from "@/components/app/shared/invoices/InfoItem";
import { InfoTitle } from "@/components/app/shared/invoices/InfoTitle";

export const TargetInfo = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <InfoTitle text={title} />

      <div className="grid grid-cols-1 gap-1">
        {items.map((item, index) => (
          <InfoItem key={index} text={item} />
        ))}
      </div>
    </div>
  );
};
