"use client";

import { Button } from "@heroui/react";
import ExportIcon from "@/assets/icons/app/export.svg";
import { useDict } from "@/hooks/useDict";
import { ExportModel } from "@/types/export/export.model";
import { ExportService } from "@/services/export.service";
import { ExportParams } from "@/types/export/export.params";
import { useLang } from "@/hooks/useLang";
import { useState } from "react";
export const ExportButton = ({
  model,
  params,
  onPress,
}: {
  model: ExportModel | string;
  params?: ExportParams;
  onPress?: () => void;
}) => {
  const dict = useDict();
  const lng = useLang();
  const [busy, setBusy] = useState(false);
  return (
    <Button
      startContent={<ExportIcon className="size-5" />}
      className="text-app-primary h-10 rounded-lg bg-[#5DD5C412] px-3.5 text-sm leading-5 font-semibold tracking-tight"
      onPress={() => {
        if (onPress) {
          onPress();
          return;
        }
        setBusy(true);

        ExportService.exportToExcel(model, params, lng)
          .then(() => {
            setBusy(false);
          })
          .catch(() => {
            setBusy(false);
          });
      }}
      isLoading={busy}
      isDisabled={busy}
    >
      {dict.common.actions.export}
    </Button>
  );
};
