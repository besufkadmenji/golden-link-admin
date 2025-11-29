import { AppCheckbox } from "@/components/app/shared/AppCheckbox";
import {
  cn,
  Pagination,
  PaginationItemRenderProps,
  PaginationItemType,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Key, ReactNode, useState } from "react";
import ChevronRightIcon from "@/assets/icons/app/chevron.right.svg";
import ChevronLeftIcon from "@/assets/icons/app/chevron.left.svg";
import { twMerge } from "tailwind-merge";

export type ColumnType = {
  key: string;
  label: string;
  align?: "start" | "end" | "center";
};

export type RowType = {
  key: string;
  [key: string]: string;
};

export type PaginationType = {
  page: number;
  total: number;
  onChange: (page: number) => void;
};
export const AppTable = ({
  columns,
  rows,
  renderCell,
  selectedRows,
  onRowSelect,
  onSelectAllRows,
  pagination,
  label,
  endAlign = "end",
  classNames,
  disableSelect = false,
  rowClick,
}: {
  columns: ColumnType[];
  rows: RowType[];
  renderCell: (row: RowType, column: Key) => ReactNode;
  selectedRows?: RowType[];
  onRowSelect?: (rows: RowType[]) => void;
  onSelectAllRows?: (rows: RowType[]) => void;
  pagination?: PaginationType;
  label?: string;
  endAlign?: "center" | "start" | "end" | undefined;
  disableSelect?: boolean;
  classNames?: {
    table?: string;
    wrapper?: string;
    th?: string;
    tr?: string;
  };
  rowClick?: (row: RowType) => void;
}) => {
  const [innerSelectedRows, setInnerSelectedRows] = useState<RowType[]>(
    selectedRows || [],
  );

  const allSelected =
    innerSelectedRows.length === rows.length && rows.length > 0;
  const someSelected =
    innerSelectedRows.length > 0 && innerSelectedRows.length < rows.length;

  return (
    <div
      className={twMerge(
        "border-gray-border-alt dark:bg-dark-black dark:border-dark-border grid grid-cols-1 overflow-hidden rounded-lg border bg-white p-0 shadow-[0px_1.5px_2px_0px_rgba(16,24,40,0.10)]",
        classNames?.table,
      )}
    >
      <Table
        aria-label={label ?? "App Table"}
        classNames={{
          wrapper: twMerge(
            "shadow-none border border-gray-background dark:border-dark-border p-0 rounded-none",
            classNames?.wrapper,
          ),
          th: twMerge(
            "rounded-none! bg-gray-border dark:bg-title border-b text-title text-sm font-medium leading-5 tracking-tight border-b-dark-white dark:text-white dark:border-b-dark-border",
            classNames?.th,
          ),
          tr: twMerge(
            "border-b border-gray-background dark:border-dark-border text-subTitle text-sm font-medium dark:text-dark-white leading-5 tracking-tight h-12",
            classNames?.tr,
            rowClick &&
              "cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-black",
          ),
        }}
        key={innerSelectedRows.length}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={
                column.align ??
                (columns[columns.length - 1].key === column.key
                  ? endAlign
                  : "start")
              }
            >
              {!disableSelect && columns[0].key === column.key && (
                <AppCheckbox
                  isIndeterminate={someSelected}
                  isSelected={allSelected}
                  onValueChange={(v) => {
                    const next = v ? [...rows] : [];
                    setInnerSelectedRows(next);
                    onSelectAllRows?.(next);
                  }}
                />
              )}
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key} onClick={() => rowClick?.(item)}>
              {(columnKey) => (
                <TableCell>
                  {!disableSelect && columns[0].key === columnKey ? (
                    <div className="flex items-center">
                      <AppCheckbox
                        isSelected={innerSelectedRows.some(
                          (r) => r.key === item.key,
                        )}
                        onValueChange={(v) => {
                          const exists = innerSelectedRows.some(
                            (r) => r.key === item.key,
                          );
                          let next: RowType[];
                          if (v) {
                            next = exists
                              ? innerSelectedRows
                              : [...innerSelectedRows, item];
                          } else {
                            next = innerSelectedRows.filter(
                              (r) => r.key !== item.key,
                            );
                          }
                          setInnerSelectedRows(next);
                          onRowSelect?.(next);
                        }}
                      />
                      {renderCell(item, columnKey)}
                    </div>
                  ) : (
                    renderCell(item, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {pagination && <AppPagination pagination={pagination} />}
    </div>
  );
};

const AppPagination = ({ pagination }: { pagination: PaginationType }) => {
  const hasNext = pagination.page < pagination.total;
  const hasPrevious = pagination.page > 1;
  const renderItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }: PaginationItemRenderProps) => {
    if (value === PaginationItemType.NEXT) {
      return hasNext ? (
        <button
          key={key}
          className={cn(
            className,
            "text-app-primary size-8 min-w-8 bg-[#5DD5C412]",
          )}
          onClick={onNext}
        >
          <ChevronRightIcon className="size-5 rtl:rotate-180" />
        </button>
      ) : (
        <></>
      );
    }

    if (value === PaginationItemType.PREV) {
      return hasPrevious ? (
        <button
          key={key}
          className={cn(
            className,
            "text-app-primary size-8 min-w-8 bg-[#5DD5C412]",
          )}
          onClick={onPrevious}
        >
          <ChevronLeftIcon className="size-5 rtl:rotate-180" />
        </button>
      ) : (
        <></>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <button key={key} className={className}>
          ...
        </button>
      );
    }

    return (
      <button
        key={key}
        ref={ref}
        className={cn(className)}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    );
  };

  return (
    <Pagination
      page={pagination.page}
      total={pagination.total}
      onChange={pagination.onChange}
      renderItem={renderItem}
      showControls
      className="mx-2 my-3"
      classNames={{
        cursor:
          "bg-app-primary rounded-lg text-sm font-semibold leading-5 tracking-tight size-8",
        item: "rounded-lg bg-[#5DD5C412] text-app-primary size-8 text-sm font-semibold leading-5 tracking-tight",
        prev: "size-8 bg-[#5DD5C412] text-app-primary",
        wrapper: "gap-2",
      }}
    />
  );
};
