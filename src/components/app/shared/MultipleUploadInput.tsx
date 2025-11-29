import UploadIcon from "@/assets/icons/app/upload.alt.svg";
import UploadButtonIcon from "@/assets/icons/app/upload.svg";
import { useDict } from "@/hooks/useDict";
import Image from "next/image";
import Dropzone from "react-dropzone";
import { FileIcon, defaultStyles } from "react-file-icon";
import TrashIcon from "@/assets/icons/app/trash.svg";
import { Button } from "@heroui/react";

export const MultipleUploadInput = ({
  files,
  onChange,
  errorMessage,
}: {
  files: File[];
  onChange: (files: File[]) => void;
  errorMessage?: string;
}) => {
  const hasError = Boolean(errorMessage);
  const dict = useDict();
  console.log("files in MultipleUploadInput:", files);
  return (
    <div className="grid gap-4">
      <Dropzone
        onDrop={(acceptedFiles) => {
          if (acceptedFiles.length > 0) {
            onChange([...files, ...acceptedFiles]);
          }
        }}
        multiple={true}
        accept={{
          "image/jpeg": [],
          "image/png": [],
          "application/pdf": [],
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            className={
              "bg-gray-background relative cursor-pointer grid min-h-41.5 w-full grid-cols-1 rounded-xl border border-dashed border-[#EEEEEE] p-0.5 py-6" +
              (hasError ? " ring-danger-500 ring-2" : "")
            }
            {...getRootProps()}
          >
            <input {...getInputProps()} />

            <div className="relative z-10 grid h-full auto-rows-max grid-cols-1 content-center justify-items-center gap-4">
              <UploadIcon className="size-10" />
              <div className="grid justify-items-center gap-2">
                <p className="text-secondary text-sm leading-5 font-normal">
                  {dict.common.documents.attachDocuments}
                </p>
                <p className="text-gray text-xs leading-4 font-normal">
                  {dict.common.documents.supportedFormats}
                </p>
              </div>

              <div className="bg-app-primary flex h-10 items-center gap-1 rounded-lg px-15 text-white">
                <UploadButtonIcon className="size-5 shrink-0" />

                <p className="text-sm leading-5 font-semibold tracking-tight">
                  {dict.common.actions.upload}
                </p>
              </div>
            </div>
          </div>
        )}
      </Dropzone>
      <div className="flex flex-wrap justify-center gap-4">
        {files.map((file, index) => (
          <SelectedFile
            key={file.name + index}
            file={file}
            onRemove={() => {
              const newFiles = files.filter((_, i) => i !== index);
              onChange(newFiles);
            }}
          />
        ))}
      </div>
    </div>
  );
};

const SelectedFile = ({
  file,
  onRemove,
}: {
  file: File;
  onRemove: () => void;
}) => {
  const url = URL.createObjectURL(file);
  const extension = file?.name.split(".").pop() || "";
  return (
    <div className="bg-dashboard-border relative z-10 grid size-20 grid-cols-1 overflow-hidden rounded-xl">
      {file && (file.type === "image/jpeg" || file.type === "image/png") ? (
        <Image
          src={url}
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
      <Button
        isIconOnly
        onPress={onRemove}
        className="absolute end-1 top-1 size-6 min-h-0 min-w-0 bg-white p-0"
      >
        <TrashIcon className="size-4 cursor-pointer text-[#EA5455]" />
      </Button>
    </div>
  );
};
