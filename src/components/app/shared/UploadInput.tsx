import UploadIcon from "@/assets/icons/app/upload.alt.svg";
import UploadButtonIcon from "@/assets/icons/app/upload.svg";
import Image from "next/image";
import Dropzone from "react-dropzone";
import { FileIcon, defaultStyles } from "react-file-icon";
import { PrimaryButton } from "./button/PrimaryButton";
import { useDict } from "@/hooks/useDict";

export const UploadInput = ({
  label,
  desc,
  file,
  onChange,
  errorMessage,
}: {
  label: string;
  desc: string;
  file?: File | null;
  onChange: (file: File) => void;
  errorMessage?: string;
}) => {
  const url = file ? URL.createObjectURL(file) : null;
  const extension = file?.name.split(".").pop() || "";
  const hasError = Boolean(errorMessage);
  const dict = useDict();
  return (
    <div className="grid gap-1">
      <Dropzone
        onDrop={(acceptedFiles) => {
          if (acceptedFiles.length > 0) {
            onChange(acceptedFiles[0]);
          }
        }}
        accept={{
          "image/jpeg": [],
          "image/png": [],
          "application/pdf": [],
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            className={
              "bg-gray-background dark:bg-dark-border relative grid min-h-41.5 w-full grid-cols-1 rounded-xl border border-dashed border-[#EEEEEE] dark:border-dark-gray p-0.5 py-6" +
              (hasError ? " ring-danger-500 ring-2" : "")
            }
            {...getRootProps()}
          >
            <input {...getInputProps()} />

            {/* <BorderDashedIcon /> */}
            {url ? (
              <div className="relative z-10 grid h-full w-full grid-cols-1 overflow-hidden rounded-xl">
                {file &&
                (file.type === "image/jpeg" || file.type === "image/png") ? (
                  <Image
                    src={url}
                    layout="fill"
                    className="object-contain"
                    alt=""
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
              </div>
            ) : (
              <div className="relative z-10 grid h-full auto-rows-max grid-cols-1 content-center justify-items-center gap-4">
                <UploadIcon className="size-10" />
                <div className="grid justify-items-center gap-2">
                  <p className="text-secondary dark:text-white text-sm leading-5 font-normal">
                    {label}
                  </p>
                  <p className="text-gray dark:text-white/70 text-xs leading-4 font-normal">
                    {desc}
                  </p>
                </div>

                <div className="bg-app-primary flex h-10 items-center gap-1 rounded-lg px-15 text-white">
                  <UploadButtonIcon className="size-5 shrink-0" />

                  <p className="text-sm leading-5 font-semibold tracking-tight">
                    {dict.common.actions.upload}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </Dropzone>
      {hasError ? (
        <p className="text-danger-500 text-xs leading-4 font-normal">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
};
