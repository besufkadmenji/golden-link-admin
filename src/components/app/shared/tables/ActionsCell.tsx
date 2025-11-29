import ViewIcon from "@/assets/icons/app/view.svg";
import EditIcon from "@/assets/icons/app/edit.svg";
import DeleteIcon from "@/assets/icons/app/trash.svg";
import { ReactNode } from "react";
import { Button } from "@heroui/react";

export const ActionsCell = ({
  onView,
  onEdit,
  onDelete,
}: {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}) => {
  return (
    <div className="flex items-center justify-end gap-2">
      {onView && (
        <ActionCell
          icon={
            <ViewIcon className="text-subTitle dark:text-dark-dashboard-title size-5" />
          }
          onClick={onView}
        />
      )}
      {onEdit && (
        <ActionCell
          icon={
            <EditIcon className="text-subTitle dark:text-dark-dashboard-title size-5" />
          }
          onClick={onEdit}
        />
      )}
      {onDelete && (
        <ActionCell
          icon={
            <DeleteIcon className="text-subTitle dark:text-dark-dashboard-title size-5" />
          }
          onClick={onDelete}
        />
      )}
    </div>
  );
};

export const ActionCell = ({
  icon,
  onClick,
}: {
  icon: ReactNode;
  onClick: () => void;
}) => {
  return (
    <Button
      isIconOnly
      onPress={onClick}
      className="size-5 min-h-0 min-w-0 rounded bg-transparent"
    >
      {icon}
    </Button>
  );
};
