"use client";
import {
  AddButton,
  AddButtonType,
} from "@/components/app/shared/button/AddButton";
import { ExportButton } from "@/components/app/shared/button/ExportButton";
import { PrintButton } from "@/components/app/shared/button/PrintButton";
import {
  SaveButton,
  SaveButtonType,
} from "@/components/app/shared/button/SaveButton";
import {
  SummaryCard,
  SummaryCardType,
  PieceCounter,
} from "@/components/app/shared/summary/SummaryCard";
import { AppTable, RowType } from "@/components/app/shared/tables/AppTable";
import { Key, ReactNode } from "react";
import { ActionsCell } from "@/components/app/shared/tables/ActionsCell";

export const Preview = () => {
  return (
    <div className="flex h-screen w-screen auto-rows-max flex-wrap items-start gap-10 overflow-y-auto bg-white p-10">
      <ExportButton />
      <AddButton type={AddButtonType.Category} />
      <SaveButton type={SaveButtonType.Category} />
      <PrintButton label="Test" />
      <SummaryCard
        type={SummaryCardType.CATEGORY}
        value={10}
        endContent={<PieceCounter amount={3278} />}
      />
      <AppTable
        columns={[
          {
            key: "name",
            label: "Name",
          },
          {
            key: "action",
            label: "Action",
          },
        ]}
        rows={[
          {
            key: "1",
            name: "John Doe",
            action: "",
          },
          {
            key: "2",
            name: "John Doe",
            action: "",
          },
          {
            key: "3",
            name: "John Doe",
            action: "",
          },
        ]}
        renderCell={(row: RowType, column: Key): ReactNode => {
          if (column === "action") {
            return (
              <ActionsCell
                onView={() => {}}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            );
          }
          return row[column as string];
        }}
        onRowSelect={(v) => {}}
        onSelectAllRows={(v) => {}}
        pagination={{
          page: 1,
          total: 5,
          onChange: (v) => {},
        }}
      />
    </div>
  );
};
