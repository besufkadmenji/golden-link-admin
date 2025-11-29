import NoProductIcon from "@/assets/icons/app/no.product.svg";
import { useDict } from "@/hooks/useDict";

export const NoProduct = () => {
  const dict = useDict();
  return (
    <div className="grid auto-rows-max items-center justify-items-center gap-2 pt-24">
      <NoProductIcon className="size-28" />
      <p className="text-subTitle text-center dark:text-dark-light-gray text-xl leading-8">
        {dict.createDisbursementRequest.noProducts}
      </p>
    </div>
  );
};
