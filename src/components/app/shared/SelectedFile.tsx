import Image from "next/image";
import { FileIcon, defaultStyles } from "react-file-icon";
import TrashIcon from "@/assets/icons/app/trash.svg";
import { Button } from "@heroui/react";

export const SelectedFile = ({
  file,
  initUrl,
  onRemove,
}: {
  file?: File;
  initUrl?: string;
  onRemove?: () => void;
}) => {
  const url = file ? URL.createObjectURL(file) : initUrl;
  const extension = file?.name.split(".").pop() || "";
  return (
    <div className="bg-dashboard-border relative z-10 grid size-20 grid-cols-1 overflow-hidden rounded-xl">
      {(file && (file.type === "image/jpeg" || file.type === "image/png")) ||
      initUrl ? (
        <Image
          src={url!}
          layout="fill"
          className="object-contain"
          alt=""
          unoptimized
        />
      ) : (
        <div className="grid h-full w-full auto-rows-max grid-cols-1 content-center justify-items-center gap-2 px-4">
          <div className="grid size-8">
            <FileIcon extension={extension} {...defaultStyles.pdf} />
          </div>
          <p className="text-secondary line-clamp-1 w-full text-sm leading-5 font-normal text-ellipsis">
            {file?.name}
          </p>
        </div>
      )}
      {onRemove && (
        <Button
          isIconOnly
          onPress={onRemove}
          className="absolute end-1 top-1 size-6 min-h-0 min-w-0 bg-white p-0"
        >
          <TrashIcon className="size-4 cursor-pointer text-[#EA5455]" />
        </Button>
      )}
    </div>
  );
};
