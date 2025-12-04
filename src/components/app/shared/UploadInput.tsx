import UploadIcon from "@/assets/icons/app/upload.alt.svg";
import UploadButtonIcon from "@/assets/icons/app/upload.svg";
import { SelectedFile } from "@/components/app/shared/SelectedFile";
import { useDict } from "@/hooks/useDict";
import Dropzone, { Accept } from "react-dropzone";

export const UploadInput = ({
  label,
  desc,
  file,
  onChange,
  errorMessage,
  accept,
  initUrl,
}: {
  label: string;
  desc: string;
  file?: File | null;
  onChange: (file?: File) => void;
  errorMessage?: string;
  accept?: Accept;
  initUrl?: string;
}) => {
  const hasError = Boolean(errorMessage);
  const dict = useDict();
  return (
    <div className="grid gap-4">
      <Dropzone
        onDrop={(acceptedFiles) => {
          if (acceptedFiles.length > 0) {
            onChange(acceptedFiles[0]);
          }
        }}
        accept={
          accept ?? {
            "image/jpeg": [],
            "image/png": [],
            "application/pdf": [],
          }
        }
      >
        {({ getRootProps, getInputProps }) => (
          <div
            className={
              "bg-gray-background dark:bg-dark-border dark:border-dark-gray relative grid min-h-41.5 w-full grid-cols-1 rounded-xl border border-dashed border-[#EEEEEE] p-0.5 py-6" +
              (hasError ? " ring-danger-500 ring-2" : "")
            }
            {...getRootProps()}
          >
            <input {...getInputProps()} />

            <div className="relative z-10 grid h-full auto-rows-max grid-cols-1 content-center justify-items-center gap-4">
              <UploadIcon className="size-10" />
              <div className="grid justify-items-center gap-2">
                <p className="text-secondary text-sm leading-5 font-normal dark:text-white">
                  {label}
                </p>
                <p className="text-gray text-xs leading-4 font-normal dark:text-white/70">
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
          </div>
        )}
      </Dropzone>
      <div className="flex flex-wrap justify-center gap-4">
        {(file || initUrl) && (
          <SelectedFile
            file={file ?? undefined}
            initUrl={initUrl}
            onRemove={() => {
              onChange(undefined);
            }}
          />
        )}
      </div>
      {hasError ? (
        <p className="text-danger-500 text-xs leading-4 font-normal">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
};
